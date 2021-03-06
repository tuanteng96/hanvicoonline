import React from "react";
import { SERVER_APP } from "./../../constants/config";
import {
  formatPriceVietnamese,
  checkSale,
  percentagesSale,
} from "../../constants/format";
import { getUser } from "../../constants/user";
import ShopDataService from "./../../service/shop.service";
import CartToolBar from "../../components/CartToolBar";
import {
  Page,
  Link,
  Toolbar,
  Navbar,
  PhotoBrowser,
  Sheet,
} from "framework7-react";
import ReactHtmlParser from "react-html-parser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      arrProduct: [],
      arrRelProds: [],
      arrImages: [],
      arrOptions: [],
      photos: [],
      sheetOpened: false,
      activeID: null,
      quantity: 1,
      isLoading: false,
      isProbably: false,
    };
  }

  getDetialProduct = () => {
    const cateID = this.$f7route.params.cateId;

    ShopDataService.getDetailFull(cateID)
      .then((response) => {
        const resultRes = response.data.data;
        const arrImages = resultRes.images;

        const ptotosNew = [];
        for (let photo in arrImages) {
          var itemPhoho = {};
          itemPhoho.url =
            SERVER_APP + "/Upload/image/" + arrImages[photo].Value;
          itemPhoho.caption = arrImages[photo].Title;
          ptotosNew.push(itemPhoho);
        }

        this.setState({
          arrProduct: resultRes.product,
          arrRelProds: resultRes.product.RelProds,
          photos: ptotosNew,
          arrOptions: resultRes.options,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  componentDidMount() {
    this.getDetialProduct();
  }
  openSheet = () => {
    const { arrProduct } = this.state;
    this.setState({
      sheetOpened: true,
      arrProductCopy: arrProduct,
    });
  };
  closeSheet = () => {
    const { arrProductCopy } = this.state;
    this.setState({
      sheetOpened: false,
      arrProduct: arrProductCopy,
      quantity: 1,
    });
  };

  handleOption = (item) => {
    const { arrOptions } = this.state;
    arrOptions.map((opt) => {
      if (opt.ID === item.ID) {
        this.setState({
          arrProduct: opt,
          activeID: item.ID,
          quantity: 1,
        });
      }
    });
  };
  handleChangeQty = (event) => {
    this.setState({
      quantity: event.target.value,
    });
  };
  IncrementItem = () => {
    this.setState((prevState) => {
      if (prevState.quantity < 9) {
        return {
          quantity: prevState.quantity + 1,
        };
      } else {
        return null;
      }
    });
  };
  DecreaseItem = () => {
    this.setState((prevState) => {
      if (prevState.quantity > 1) {
        return {
          quantity: prevState.quantity - 1,
        };
      } else {
        return null;
      }
    });
  };

  onPageBeforeOut = () => {
    const self = this;
    // Close opened sheets on page out
    self.$f7.sheet.close();
  };
  onPageBeforeRemove = () => {
    const self = this;
    // Destroy sheet modal when page removed
    if (self.sheet) self.sheet.destroy();
  };

  setStateLoading = (isloading) => {
    this.setState({
      isLoading: isloading,
    });
  };
  closeProbablySheet = () => {
    this.setState({
      isProbably: false,
    });
  }
  openProbablySheet = () => {
  this.setState({
    isProbably: true,
  });
  }
  orderSubmit = () => {
    //code here
    const infoUser = getUser();
    if (!infoUser) {
      this.$f7router.navigate("/login/");
    } else {
      const { arrProduct, quantity } = this.state;
      const self = this;
      self.$f7.preloader.show();
      this.setStateLoading(true);
      const data = {
        order: {
          ID: 0,
          SenderID: infoUser.ID,
          VCode: "",
          Tinh: 5,
          Huyen: 37,
          MethodPayID: 1,
        },
        adds: [
          {
            ProdID: arrProduct.ID,
            Qty: quantity,
            PriceOrder:
              arrProduct.PriceSale < 0
                ? arrProduct.PriceProduct
                : arrProduct.PriceSale,
          },
        ],
      };

      ShopDataService.getUpdateOrder(data)
        .then((response) => {
          if (response.data.success) {
            self.$f7.preloader.hide();
            self.setStateLoading(false);
            toast.success("Thêm đơn hàng vào giỏ hàng thành công !", {
              position: toast.POSITION.TOP_LEFT,
              autoClose: 3000,
            });
            this.$f7router.navigate("/pay/");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  handleProbably = (item) => {
    //code here
    const infoUser = getUser();
    if (!infoUser) {
      this.$f7router.navigate("/login/");
    } else {
      const self = this;
      self.$f7.preloader.show();
      this.setStateLoading(true);
      const data = {
        order: {
          ID: 0,
          SenderID: infoUser.ID,
          VCode: "",
          Tinh: 5,
          Huyen: 37,
          MethodPayID: 1,
        },
        adds: [
          {
            ProdID: item.ID,
            Qty: 1,
            PriceOrder: item.PriceSale < 0 ? item.PriceProduct : item.PriceSale,
          },
        ],
      };

      ShopDataService.getUpdateOrder(data)
        .then((response) => {
          if (response.data.success) {
            self.$f7.preloader.hide();
            self.setStateLoading(false);
            toast.success("Thêm đơn hàng vào giỏ hàng thành công !", {
              position: toast.POSITION.TOP_LEFT,
              autoClose: 3000,
            });
            this.$f7router.navigate("/pay/");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  probablyHTML = () => {
    const { arrRelProds } = this.state;

    return (
      <li className="size" onClick={() => this.openProbablySheet()}>
        <div className="size-title">
          Sản phẩm lẽ trong bộ
          <span>( {arrRelProds && arrRelProds.length} sản phẩm )</span>
        </div>
        <div className="probably-list">
          {arrRelProds &&
            arrRelProds.map((item, index) => {
              if (index > 1) return;
              return (
                <div className="probably-list__item" key={index}>
                  <div className="title">{item.Title}</div>
                  <div className="option">
                    <div
                      className={
                        "option-price " + (item.PriceSale > 0 ? "sale" : "")
                      }
                    >
                      <span className="price">
                        {formatPriceVietnamese(item.PriceProduct)}
                        <b>₫</b>
                      </span>
                      <span className="price-sale">
                        {formatPriceVietnamese(item.PriceSale)}
                        <b>₫</b>
                      </span>
                    </div>
                    <div className="option-btn">Mua Ngay</div>
                  </div>
                </div>
              );
            })}
          {arrRelProds && arrRelProds.length > 2 ? (
            <div className="show-more">
              <span>Xem thêm</span>
            </div>
          ) : (
            ""
          )}
        </div>
      </li>
    );
  };

  render() {
    const {
      arrProduct,
      arrOptions,
      arrRelProds,
      photos,
      sheetOpened,
      activeID,
      quantity,
      isLoading,
      isProbably,
    } = this.state;

    return (
      <Page
        onPageBeforeOut={this.onPageBeforeOut}
        onPageBeforeRemove={this.onPageBeforeRemove}
        name="shop-detail"
      >
        <Navbar>
          <div className="page-navbar">
            <div className="page-navbar__back">
              <Link onClick={() => this.$f7router.back()}>
                <i className="las la-angle-left"></i>
              </Link>
            </div>
            <div className="page-navbar__title">
              <span className="title">
                {arrProduct.Title} {this.$f7route.params.cateId }
              </span>
            </div>
            <div className="page-navbar__cart">
              <CartToolBar />
            </div>
          </div>
        </Navbar>
        <PhotoBrowser
          photos={photos}
          theme="dark"
          popupCloseLinkText="Đóng"
          navbarOfText="/"
          ref={(el) => {
            this.standaloneDark = el;
          }}
        />
        <div className="page-render no-bg p-0">
          <div className="page-shop no-bg">
            <div className="page-shop__detail">
              <div className="page-shop__detail-img">
                <img
                  onClick={() => this.standaloneDark.open()}
                  src={SERVER_APP + "/Upload/image/" + arrProduct.Thumbnail}
                  alt={arrProduct.title}
                />
              </div>
              <div
                className={
                  "page-shop__detail-list " +
                  (checkSale(arrProduct.SaleBegin, arrProduct.SaleEnd) === true
                    ? "sale"
                    : "")
                }
              >
                <ul>
                  <li>
                    <div className="text">{arrProduct.Title}</div>
                  </li>
                  <li>
                    <div className="title">Mã sản phẩm</div>
                    <div className="text">{arrProduct.DynamicID}</div>
                  </li>
                  <li className="product">
                    <div className="title">
                      Giá{" "}
                      {checkSale(arrProduct.SaleBegin, arrProduct.SaleEnd) ===
                      true
                        ? "Gốc"
                        : ""}
                    </div>
                    <div className="text">
                      {formatPriceVietnamese(arrProduct.PriceProduct)}
                      <b>₫</b>
                    </div>
                  </li>
                  <li className="product-sale">
                    <div className="title">
                      <div className="badges badges-danger">
                        {percentagesSale(
                          arrProduct.PriceProduct,
                          arrProduct.PriceSale
                        )}
                        %
                      </div>
                    </div>
                    <div className="text">
                      {formatPriceVietnamese(arrProduct.PriceSale)}
                      <b>₫</b>
                    </div>
                  </li>
                  <li className="size" onClick={() => this.openSheet()}>
                    <div className="size-title">
                      Chọn kích thước
                      <span>( {arrOptions.length} kích thước )</span>
                    </div>
                    <div
                      className={
                        "size-list " +
                        (arrOptions.length > 2 ? "size-list--full" : "")
                      }
                    >
                      <div className="size-list--box">
                        {arrOptions &&
                          arrOptions.map((item, index) => {
                            if (index > 1) return;
                            return (
                              <div key={index} className="size-list__item">
                                <span>{item.DynamicID}</span>
                              </div>
                            );
                          })}
                        <div className="size-list__total">
                          <span>+{arrOptions.length - 2}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                  {arrRelProds && arrRelProds.length > 0
                    ? this.probablyHTML()
                    : ""}
                  {arrProduct.Desc !== "" && arrProduct.Detail !== "" ? (
                    <li className="content">
                      <div className="content-title">Chi tiết sản phẩm</div>
                      <div className="content-post">
                        {ReactHtmlParser(arrProduct.Desc)}
                        {ReactHtmlParser(arrProduct.Detail)}
                      </div>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Sheet
          className="sheet-swipe-product"
          style={{ height: "auto", "--f7-sheet-bg-color": "#fff" }}
          opened={sheetOpened}
          onSheetClosed={() => this.closeSheet()}
          swipeToClose
          swipeToStep
          backdrop
        >
          <div className="sheet-modal-swipe-step">
            <div className="sheet-modal-swipe__close"></div>
            <div className="sheet-swipe-product__content">
              <div className="sheet-pay-head">
                <div className="image">
                  <img
                    src={SERVER_APP + "/Upload/image/" + arrProduct.Thumbnail}
                    alt={arrProduct.Title}
                  />
                </div>
                <div className="text">
                  <h3>{arrProduct.Title}</h3>
                  <div
                    className={
                      "price " +
                      (checkSale(arrProduct.SaleBegin, arrProduct.SaleEnd) ===
                      true
                        ? "hasSale"
                        : "")
                    }
                  >
                    <p className="price-p">
                      {formatPriceVietnamese(arrProduct.PriceProduct)}
                      <b>₫</b>
                    </p>
                    <p className="price-s">
                      {formatPriceVietnamese(arrProduct.PriceSale)}
                      <b>₫</b>
                    </p>
                  </div>
                </div>
              </div>
              <div className="sheet-pay-body">
                <div className="sheet-pay-body__size">
                  <h4>Kích thước</h4>
                  <ul>
                    {arrOptions &&
                      arrOptions.map((item, index) => {
                        return (
                          <li
                            key={index}
                            onClick={() => this.handleOption(item)}
                            className={activeID === item.ID ? "active" : ""}
                          >
                            <span>{item.DynamicID}</span>
                          </li>
                        );
                      })}
                  </ul>
                </div>
                <div className="sheet-pay-body__qty">
                  <h4>Số lượng</h4>
                  <div className="qty-form">
                    <button className="reduction" onClick={this.DecreaseItem}>
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={this.handleChangeQty}
                    />
                    <button className="increase" onClick={this.IncrementItem}>
                      +
                    </button>
                  </div>
                </div>
                <div className="sheet-pay-body__btn">
                  <button
                    type="button"
                    className={
                      "btn-login " + (isLoading === true ? "btn--loading" : "")
                    }
                    onClick={() => this.orderSubmit()}
                  >
                    <span className="btn-login__text">Mua hàng ngay</span>
                    <div className="btn-login__loading"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Sheet>

        <Sheet
          className="sheet-swipe-product sheet-swipe-probably"
          style={{ height: "auto", "--f7-sheet-bg-color": "#fff" }}
          opened={isProbably}
          onSheetClosed={() => this.closeProbablySheet()}
          swipeToClose
          swipeToStep
          backdrop
        >
          <div className="sheet-modal-swipe-step">
            <div className="sheet-modal-swipe__close"></div>
            <div className="sheet-swipe-product__content">
              <div className="sheet-pay-head">
                <h3>Sản phẩm bán lẻ</h3>
              </div>
              <div>
                <div className="probably-list">
                  {arrRelProds &&
                    arrRelProds.map((item, index) => (
                      <div
                        className="probably-list__item"
                        key={index}
                        onClick={() => this.handleProbably(item)}
                      >
                        <div className="title">{item.Title}</div>
                        <div className="option">
                          <div
                            className={
                              "option-price " +
                              (item.PriceSale > 0 ? "sale" : "")
                            }
                          >
                            <span className="price">
                              {formatPriceVietnamese(item.PriceProduct)}
                              <b>₫</b>
                            </span>
                            <span className="price-sale">
                              {formatPriceVietnamese(item.PriceSale)}
                              <b>₫</b>
                            </span>
                          </div>
                          <div className="option-btn">Mua Ngay</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Sheet>

        <Toolbar tabbar position="bottom">
          <div className="page-toolbar">
            <div className="page-toolbar__order">
              <button
                className="page-btn-order btn-login"
                onClick={() => this.openSheet()}
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </Toolbar>
      </Page>
    );
  }
}
