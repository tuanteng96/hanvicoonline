import React from "react";
import { SERVER_APP } from "./../../constants/config";
import ReactHtmlParser from "react-html-parser";
import NewsDataService from "../../service/news.service";
import { Page, Link, Navbar, Toolbar } from "framework7-react";
import ToolBar from '../../components/ToolBar';

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      arrNews: [],
    };
  }

  componentDidMount() {
    this.$f7ready((f7) => {
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
    });
  }

  render() {
    const arrNews = this.state.arrNews;
    return (
      <Page name="news-list">
        <Navbar>
          <div className="page-navbar">
            <div className="page-navbar__back">
              <Link onClick={() => this.$f7router.back()}>
                <i className="las la-angle-left"></i>
              </Link>
            </div>
            <div className="page-navbar__title">
              <span className="title">Tin tức & Khuyến mại</span>
            </div>
            <div className="page-navbar__noti">
              <Link>
                <i className="las la-bell"></i>
              </Link>
            </div>
          </div>
        </Navbar>
        <div className="page-wrapper">
          <div className="page-render">
            <div className="page-news__list page-news__all">
              <div className="page-news__list-ul">
                {arrNews &&
                  arrNews.map((item, index) => {
                    return (
                      <div className="page-news__list-item" key={item.ID}>
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
              </div>
            </div>
          </div>
        </div>
        <Toolbar tabbar position="bottom">
          <ToolBar />
        </Toolbar>
      </Page>
    );
  }
}
