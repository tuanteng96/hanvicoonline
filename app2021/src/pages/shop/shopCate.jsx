import React from "react";
import { SERVER_APP } from "./../../constants/config";
import ShopDataService from "./../../service/shop.service";
import { Page, Link, Toolbar, Navbar } from "framework7-react";
import ReactHtmlParser from "react-html-parser";
import ToolBarBottom from "../../components/ToolBarBottom";
import CartToolBar from "../../components/CartToolBar";
import Skeleton from "react-loading-skeleton";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
          arrCate: [],
          isLoading: true
        };
    }
    componentDidMount() {
        this.$f7ready((f7) => {
            const cateID = this.$f7route.params.cateId;
            ShopDataService.getCate(cateID)
                .then((response) => {
                    const arrCate = response.data;
                    this.setState({
                      arrCate: arrCate,
                      isLoading: false
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
        })
    }
    getTitle = () => {
        if (this.$f7route.params.cateId === "795") {
            return "Danh Mục Dịch Vụ"
        }
        else {
            return "Danh Mục Sản Phẩm"
        }
  }
  
  renderListProduct = () => {
    const { arrCate } = this.state;
    return (
      <div className="page-shop__cate">
        {arrCate &&
          arrCate.map((item) => {
            if (item.Child > 0) {
              return (
                <a
                  href={"/shop/" + item.ID}
                  className="page-shop__cate-item"
                  key={item.ID}
                >
                  <div className="page-shop__cate-img">
                    <img
                      src={SERVER_APP + "/Upload/image/" + item.Thumbnail2}
                      alt={item.Title}
                    />
                  </div>
                  <div className="page-shop__cate-text">
                    <h3>{item.Title}</h3>
                    <div className="page-shop__cate-desc">
                      {ReactHtmlParser(item.Desc)}
                    </div>
                  </div>
                  <i className="las la-arrow-right"></i>
                </a>
              );
            } else {
              return (
                <a
                  href={"/shop/list/" + item.ParentID + "/" + item.ID}
                  className="page-shop__cate-item"
                  key={item.ID}
                >
                  <div className="page-shop__cate-img">
                    <img
                      src={SERVER_APP + "/Upload/image/" + item.Thumbnail2}
                      alt={item.Title}
                    />
                  </div>
                  <div className="page-shop__cate-text">
                    <h3>{item.Title}</h3>
                    <div className="page-shop__cate-desc">
                      {ReactHtmlParser(item.Desc)}
                    </div>
                  </div>
                  <i className="las la-arrow-right"></i>
                </a>
              );
            }
          })}
      </div>
    );
  }


    render() {
      const {isLoading } = this.state;
        return (
          <Page name="shop-cate">
            <Navbar>
              <div className="page-navbar">
                <div className="page-navbar__back">
                  <Link onClick={() => this.$f7router.back()}>
                    <i className="las la-angle-left"></i>
                  </Link>
                </div>
                <div className="page-navbar__title">
                  <span className="title">{this.getTitle()}</span>
                </div>
                <div className="page-navbar__cart">
                  <CartToolBar />
                </div>
              </div>
            </Navbar>
            <div className="page-render no-bg">
              {isLoading === true ? (
                <div className="page-shop no-bg">
                  <a href="" className="page-shop__cate-item">
                    <div className="page-shop__cate-img">
                      {<Skeleton height={222} />}
                    </div>
                    <div className="page-shop__cate-text">
                      <h3>
                        <Skeleton count={1} />
                      </h3>
                      <div className="page-shop__cate-desc">
                        <Skeleton count={2} />
                      </div>
                    </div>
                    <i className="las la-arrow-right"></i>
                  </a>
                  <a href="" className="page-shop__cate-item">
                    <div className="page-shop__cate-img">
                      {<Skeleton height={222} />}
                    </div>
                    <div className="page-shop__cate-text">
                      <h3>
                        <Skeleton count={1} />
                      </h3>
                      <div className="page-shop__cate-desc">
                        <Skeleton count={2} />
                      </div>
                    </div>
                    <i className="las la-arrow-right"></i>
                  </a>
                </div>
              ) : (
                <div className="page-shop no-bg">
                  {this.renderListProduct()}
                </div>
              )}
            </div>
            <Toolbar tabbar position="bottom">
              <ToolBarBottom />
            </Toolbar>
          </Page>
        );
    }
}