import React, { Suspense } from "react";
import { SERVER_APP } from "./../../constants/config";
import { Page, Link, Toolbar, Row, Col, Tabs, Tab } from "framework7-react";
import ReactHtmlParser from "react-html-parser";
import NewsDataService from "../../service/news.service";
import UserService from "../../service/user.service";
import ShopDataService from "../../service/shop.service";
import Slider from "react-slick";
const ModalReviews = React.lazy(() => import("../../components/ModalReviews"));
const SelectStock = React.lazy(() => import("../../components/SelectStock"));
const CartComponent = React.lazy(() =>
  import("../../components/CartComponent")
);
import ToolBarBottom from "../../components/ToolBarBottom";
import Skeleton from "react-loading-skeleton";
import { formatPriceVietnamese, checkSale } from "../../constants/format";
import {
  getUser,
  setStockIDStorage,
  getStockIDStorage,
  setStockNameStorage,
} from "../../constants/user";

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      arrNews: [],
      arrBanner: [],
      arrPolicy: [],
      arrBannerCate: [],
      arrProductCate: [],
      arrProductList: [],
      isOpenStock: false,
      isActive: 8959,
      isLoading: true,
    };
  }

  getDateVietnamese = () => {
    var d = new Date();
    var day = d.getDay();
    var date = d.getDate();
    var month = d.getMonth();
    var days = new Array(
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy"
    );
    var months = new Array(
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    );
    return (
      <div className="page-news__header-date">
        <div className="date">
          {days[day]}, {date} tháng {months[month]}
        </div>
        <h3>Hôm nay</h3>
      </div>
    );
  };

  handStyle = () => {
    const _width = this.state.width - 100;
    return Object.assign({
      width: _width,
    });
  };

  componentDidMount() {
    const userInfo = getUser();
    this.setState({
      userInfo: userInfo,
    });
    this.$f7ready((f7) => {
      this.setState({ width: window.innerWidth });
      this.getBanner();
      this.getNewsAll();
      this.getpolicy();
      this.getCateAdv();
      this.cateListProduct();
      this.getProduct();
    });
  }

  getpolicy = () => {
    NewsDataService.getNewsIdCate(691)
      .then((response) => {
        this.setState({
          arrPolicy: response.data.data,
        });
      })
      .catch((er) => console.log(er));
  };

  getCateAdv = () => {
  NewsDataService.getBannerAdv("App.Banner")
    .then((response) => {
      const arrBanner = response.data.data;
      this.setState({
        arrBanner: arrBanner,
      });
    })
    .catch((e) => {
      console.log(e);
    });
  }

  cateListProduct = () => {
    ShopDataService.getCate(8958)
      .then((response) => {
        const arrCate = response.data;
        this.setState({
          arrProductCate: arrCate,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  getProduct = (cateid) => {
    const { isActive } = this.state;
    let stockid = getStockIDStorage();
    if (!stockid) {
      stockid = 0;
    }
    ShopDataService.getListProduct(cateid ? cateid : isActive, stockid,6)
      .then((response) => {
        const data = response.data.data.lst;
        setTimeout(() => {
          this.setState({
            arrProductList: data,
            isLoading: false,
          });
        },100)
      })
      .catch((er) => console.log(er));
  }

  handlegetProduct = (cateid) => {
    this.setState({
      isLoading: true,
      isActive: cateid,
    });
    this.getProduct(cateid);
  }

  getBanner = () => {
    NewsDataService.getBannerAdv("App.Cate")
      .then((response) => {
        const arrBannerCate = response.data.data;
        this.setState({
          arrBannerCate: arrBannerCate,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  getNewsAll = () => {
    NewsDataService.getAll()
      .then((response) => {
        const arrNews = response.data.news;
        this.setState({
          arrNews: arrNews,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  onPageBeforeIn = () => {
    const getStock = getStockIDStorage();
    UserService.getStock()
      .then((response) => {
        const arrStock = response.data.data.all;
        const countStock = arrStock.length;
        const CurrentStockID = response.data.data.CurrentStockID;
        if (countStock === 2) {
          const StockID = arrStock.slice(-1)[0].ID;
          const TitleStockID = arrStock.slice(-1)[0].Title;
          setStockIDStorage(StockID);
          setStockNameStorage(TitleStockID);
        }
        setTimeout(() => {
          if (CurrentStockID === 0 && !getStock && countStock > 2) {
            this.setState({
              isOpenStock: true,
            });
          }
        }, 500);
      })
      .catch((e) => console.log(e));
  };

  loadingItemProduct = () => {
    return (
      <Col width="50">
          <Link
            noLinkClass
            href=""
            className="page-shop__list-item"
          >
            <div className="page-shop__list-img">
              <Skeleton height={110} />
            </div>
            <div className="page-shop__list-text">
              <h3>
                <Skeleton count={1} />
            </h3>
            <div className="page-shop__list-price sale">
              <span className="price">
                <Skeleton count={1} width={50} />
              </span>
              <span className="price-sale">
                <Skeleton count={1} width={50} />
              </span>
            </div>
          </div>
        </Link>
      </Col>
    )
  }

  render() {
    const {
      userInfo,
      arrBanner,
      arrNews,
      isOpenStock,
      arrPolicy,
      arrBannerCate,
      arrProductCate,
      arrProductList,
      isActive,
      isLoading
    } = this.state;
    
    const settingsBanner = {
      className: "slider variable-width",
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      centerPadding: "20px",
      variableWidth: true,
    };
    const settingsNews = {
      className: "slider variable-width",
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      centerPadding: "20px",
      variableWidth: true,
    };
    return (
      <Page noNavbar name="news" onPageBeforeIn={() => this.onPageBeforeIn()}>
        <div className="page-wrapper">
          <div className="page-render">
            <div className="page-news__header">
              {this.getDateVietnamese()}
              <div className="page-news__header-user">
                {userInfo !== null ? (
                  <Link noLinkClass href="/profile/">
                    <i className="las la-user-circle"></i>
                  </Link>
                ) : (
                  <Link noLinkClass href="/login/">
                    <i className="las la-user-circle"></i>
                  </Link>
                )}
              </div>
            </div>
            {arrNews.length === 0 || arrNews === undefined ? (
              <div className="page-news__dear">
                <Skeleton height={500} />
                <div className="page-news__dear-text">
                  <Skeleton count={2} />
                </div>
              </div>
            ) : (
              arrNews.map((item, index) => {
                if (index >= 1) return null;
                return (
                  <div className="page-news__dear" key={item.ID}>
                    <div className="page-news__dear-img">
                      <a href={"/news/detail/" + item.ID + "/"}>
                        <img
                          src={SERVER_APP + item.Thumbnail_web}
                          alt={item.Title}
                        />
                      </a>
                    </div>
                    <div className="page-news__dear-text">
                      <a href={"/news/detail/" + item.ID + "/"}>
                        <h4>{item.Title}</h4>
                        <div className="desc">{ReactHtmlParser(item.Desc)}</div>
                      </a>
                    </div>
                  </div>
                );
              })
            )}
            <div className="page-news__cate">
              <Row>
                {arrBannerCate &&
                  arrBannerCate.map((item, index) => {
                    if (index > 4) return false;
                    return (
                      <Col width="25" key={index}>
                        <Link noLinkClass href={item.Link}>
                          <img
                            src={`${SERVER_APP}/Upload/image/${item.FileName}`}
                            alt={item.Title}
                          />
                          <span>{item.Title}</span>
                        </Link>
                      </Col>
                    );
                  })}
              </Row>
            </div>
            <div className="page-news__slide">
              <Slider {...settingsBanner}>
                {arrBanner &&
                  arrBanner.map((item, index) => {
                    if (index >= 3) return null;
                    return (
                      <Link
                        noLinkClass
                        className="page-news__slide-item"
                        key={item.ID}
                        href={item.Link}
                        style={this.handStyle()}
                      >
                        <div
                          className="bg"
                          style={{
                            background: `${item.Follow}`,
                          }}
                        >
                          <div
                            className="image"
                            style={{
                              backgroundImage: `url(${SERVER_APP}/Upload/image/${item.FileName})`,
                            }}
                          ></div>
                          <div className="text">
                            <h4>{item.Title}</h4>
                            <div className="text-desc">
                              {ReactHtmlParser(item.Desc)}
                            </div>
                            <div className="btns">
                              <div className="btn-more">Xem thêm</div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </Slider>
            </div>
            <div className="page-news__product">
              <div className="list-product">
                <div className="list-product__lst">
                  {arrProductCate &&
                    arrProductCate.map((item, index) => (
                      <Link
                        className={isActive === item.ID ? "active" : ""}
                        key={index}
                        onClick={() => this.handlegetProduct(item.ID)}
                      >
                        {item.Title}
                      </Link>
                    ))}
                </div>
              </div>
              <div className="list-product-item">
                <Row>
                  {isLoading === false ? (
                    arrProductList &&
                    arrProductList.map((item, index) => (
                      <Col width="50" key={index}>
                        <Link
                          noLinkClass
                          href={"/shop/detail/" + item.id}
                          className="page-shop__list-item"
                        >
                          <div className="page-shop__list-img">
                            <img
                              src={SERVER_APP + "/Upload/image/" + item.photo}
                              alt={item.title}
                            />
                          </div>
                          <div className="page-shop__list-text">
                            <h3>{item.title}</h3>
                            <div
                              className={
                                "page-shop__list-price " +
                                (checkSale(
                                  item.source.SaleBegin,
                                  item.source.SaleEnd
                                ) === true
                                  ? "sale"
                                  : "")
                              }
                            >
                              <span className="price">
                                <b>₫</b>
                                {formatPriceVietnamese(item.price)}
                              </span>
                              <span className="price-sale">
                                <b>₫</b>
                                {formatPriceVietnamese(item.pricesale)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </Col>
                    ))
                  ) : (
                    <>
                      {this.loadingItemProduct()}
                      {this.loadingItemProduct()}
                      {this.loadingItemProduct()}
                      {this.loadingItemProduct()}
                      {this.loadingItemProduct()}
                      {this.loadingItemProduct()}
                    </>
                  )}
                </Row>
              </div>
            </div>
            <div className="page-news__list">
              <div className="page-news__list-head">
                <h5>Tin tức mới</h5>
                <div className="all">
                  <Link href="/news-list/">
                    Xem tất cả <i className="las la-angle-right"></i>
                  </Link>
                </div>
              </div>
              <div className="page-news__list-ul">
                <Slider {...settingsNews}>
                  {arrNews &&
                    arrNews.map((item, index) => {
                      if (index < 1 && index < 4) return null;
                      return (
                        <div
                          className="page-news__list-item"
                          key={item.ID}
                          style={this.handStyle()}
                        >
                          <div className="images">
                            <a href={"/news/detail/" + item.ID + "/"}>
                              <img
                                src={SERVER_APP + item.Thumbnail_web}
                                alt={item.Title}
                              />
                            </a>
                          </div>
                          <div className="text">
                            <a href={"/news/detail/" + item.ID + "/"}>
                              <h6>{item.Title}</h6>
                              <div className="desc">
                                {ReactHtmlParser(item.Desc)}
                              </div>
                            </a>
                          </div>
                        </div>
                      );
                    })}
                </Slider>
              </div>
            </div>

            <div className="page-news__list">
              {/* <div className="page-news__list-head">
                <h5>Chính sách bán hàng</h5>
              </div> */}
              <div className="page-news__list-policy">
                {arrPolicy &&
                  arrPolicy.map((item, index) => {
                    return (
                      <div className="page-news__policy-item" key={index}>
                        <a href={"/news/detail/" + item.id + "/"}>
                          <div className="icon">
                            <i className={`las ${item.source.LinkSEO}`}></i>
                          </div>
                          <div className="text">
                            <h6>{item.text}</h6>
                            <div className="text-desc">
                              {ReactHtmlParser(item.source.Desc)}
                            </div>
                          </div>
                        </a>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <Toolbar tabbar position="bottom">
          <ToolBarBottom />
        </Toolbar>

        <Suspense fallback={<div>Loading...</div>}>
          <SelectStock isOpenStock={isOpenStock} />
          <ModalReviews />
          <CartComponent />
        </Suspense>
      </Page>
    );
  }
}
