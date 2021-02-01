import React from "react";
import { SERVER_APP } from "./../../constants/config";
import ReactHtmlParser from "react-html-parser";
import NewsDataService from "../../service/news.service";
import { Page, Link, Navbar, Toolbar } from "framework7-react";
import ToolBarBottom from "../../components/ToolBarBottom";
import NotificationIcon from "../../components/NotificationIcon";

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      arrSale: [],
    };
    }
    
    fixedContentDomain = (content) => {
    if (!content) return "";
    return content.replace(/src=\"\//g, 'src="' + SERVER_APP + '/');
  }

  componentDidMount() {
    this.$f7ready((f7) => {
      NewsDataService.getNewsIdCate(861)
        .then((response) => {
          const arrSale = response.data.data;
          this.setState({
            arrSale: arrSale,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }

  render() {
    const arrSale = this.state.arrSale && this.state.arrSale;
    return (
      <Page name="page-sale">
        <Navbar>
          {arrSale.map((item, index) => {
            if (index > 1) return false;
            return (
              <div className="page-navbar" key={index}>
                <div className="page-navbar__back">
                  <Link onClick={() => this.$f7router.back()}>
                    <i className="las la-angle-left"></i>
                  </Link>
                </div>
                <div className="page-navbar__title">
                  <span className="title">{item.source.Title}</span>
                </div>
                <NotificationIcon />
              </div>
            );
          })}
        </Navbar>
        {arrSale.map((item, index) => {
          if (index > 1) return false;
          return (
            <React.Fragment key={index}>
              <div className="page-render p-0 no-bg">
                <div className="page-news">
                  <div className="page-news__detail">
                    <div className="page-news__detail-img">
                      <img src={SERVER_APP + item.source.Thumbnail_web} />
                    </div>
                    <div className="page-news__detail-content">
                      <div className="page-news__detail-shadow">
                        <h3>{item.source.Title}</h3>
                        {ReactHtmlParser(
                          this.fixedContentDomain(item.source.Desc)
                        )}
                        {ReactHtmlParser(
                          this.fixedContentDomain(item.source.Content)
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        <Toolbar tabbar position="bottom">
          <ToolBarBottom />
        </Toolbar>
      </Page>
    );
  }
}
