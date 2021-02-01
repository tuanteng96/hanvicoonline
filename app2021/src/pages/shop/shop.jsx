import React from "react";
import { SERVER_APP } from "./../../constants/config";
import { Page, Link, Toolbar, Navbar } from "framework7-react";
import AdvDataService from '../../service/adv.service';
import NotificationIcon from "../../components/NotificationIcon";
import ToolBarBottom from "../../components/ToolBarBottom";
import SelectStock from '../../components/SelectStock';
import Skeleton from 'react-loading-skeleton';

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            arrCateAdv: [],
            isLoading: true,
            isOpenStock: false
        };
    }

    componentDidMount() {
        this.$f7ready((f7) => {
            // Call F7 APIs here
            this.getMenuShop();
        });
    }

    getMenuShop = () => {
        AdvDataService.getMenuShop()
            .then((response) => {

                const arrCateAdv = response.data.data;
                this.setState({
                    arrCateAdv: arrCateAdv,
                    isLoading: true
                })
            })
            .catch((e) => {
                console.log(e);
            });
    }

    openStock = () => {
        this.setState({
            isOpenStock: !this.state.isOpenStock
        });
    }

    render() {
        const { arrCateAdv, isLoading } = this.state;
        return (
          <Page name="shop">
            <Navbar>
              <div className="page-navbar">
                <div className="page-navbar__back">
                  <Link onClick={() => this.openStock()}>
                    <i className="las la-map-marked-alt"></i>
                  </Link>
                </div>
                <div className="page-navbar__title">
                  <span className="title">Mua hàng</span>
                </div>
                <NotificationIcon />
              </div>
            </Navbar>
            <div className="page-render p-0">
              <div className="page-shop">
                <div className="page-shop__category">
                  {isLoading ? (
                    <ul>
                      {arrCateAdv &&
                        arrCateAdv.map((item) => (
                          <li key={item.ID}>
                            <a href={"/" + item.Link}>
                              <img
                                src={
                                  SERVER_APP + "/Upload/image/" + item.FileName
                                }
                                alt={item.Title}
                              />
                              <div className="page-shop__category-title">
                                {item.Title}
                              </div>
                            </a>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <ul>
                      <li>
                        <a href="javascript:;">
                          {<Skeleton height={222} />}
                          <div className="page-shop__category-title">
                            <Skeleton count={1} />
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:;">
                          {<Skeleton height={222} />}
                          <div className="page-shop__category-title">
                            <Skeleton count={1} />
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:;">
                          {<Skeleton height={222} />}
                          <div className="page-shop__category-title">
                            <Skeleton count={1} />
                          </div>
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <Toolbar tabbar position="bottom">
              <ToolBarBottom />
            </Toolbar>
            <SelectStock isOpenStock={this.state.isOpenStock} />
          </Page>
        );
    }
}