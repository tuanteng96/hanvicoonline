import React from "react";
import { Link } from "framework7-react";
import { getUser } from "../constants/user";
import iconShop from '../assets/images/icon-shop.png';

export default class ToolBarCustom extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUrl: ""
    }
  }
  componentDidMount() {
    this.$f7ready((f7) => {
      const infoUser = getUser();
      if(infoUser) {
        this.setState({
          infoUser: infoUser
        })
      }
    })
  }

  componentDidUpdate(prevProps, prevState){
    var href = this.$f7.views.main.router.url;
    var $$ = this.Dom7;
    $$(".js-toolbar-link").removeClass("js-active");
    if(prevState.currentUrl !== href) {
      $$(".js-toolbar-link").each(function(){
        const _this = $$(this);
        const hrefLink = _this.attr('href');
        if(href === "/") {
          $$(".js-link-home").addClass("js-active");
        }
        if(hrefLink === href) {
          _this.addClass("js-active");
        }
      });
    }
  }

  menuToolbar = () => {
    const ACC_TYPE = this.state.infoUser && this.state.infoUser.acc_type;
    switch (ACC_TYPE) {
      case "M":
        return (
          <React.Fragment>
            <Link
              noLinkClass
              href="/news/"
              className="page-toolbar-bottom__link js-toolbar-link js-link-home"
            >
              <i className="las la-home"></i>
            </Link>
            <Link
              noLinkClass
              href="/sale-post/"
              className="page-toolbar-bottom__link js-toolbar-link"
            >
              <i className="lab la-creative-commons-nc"></i>
            </Link>
            <Link
              noLinkClass
              href="/shop/"
              className="page-toolbar-bottom__link active"
            >
              <div className="page-toolbar-bottom__link-inner">
                <img src={iconShop} alt="Mua hàng" />
                {/* <i className="las la-calendar-plus"></i> */}
              </div>
            </Link>
            <Link
              noLinkClass
              href="/voucher/"
              className="page-toolbar-bottom__link js-toolbar-link"
            >
              <i className="las la-gift"></i>
            </Link>
            <Link
              noLinkClass
              href="/profile/"
              className="page-toolbar-bottom__link js-toolbar-link"
            >
              <i className="las la-user-circle"></i>
            </Link>
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <Link
              noLinkClass
              href="/news/"
              className="page-toolbar-bottom__link js-toolbar-link js-link-home"
            >
              <i className="las la-home"></i>
            </Link>
            <Link
              noLinkClass
              href="/sale-post/"
              className="page-toolbar-bottom__link js-toolbar-link"
            >
              <i className="lab la-creative-commons-nc"></i>
            </Link>
            <Link
              noLinkClass
              href="/shop/"
              className="page-toolbar-bottom__link active"
            >
              <div className="page-toolbar-bottom__link-inner">
                <img src={iconShop} alt="Mua hàng" />
              </div>
            </Link>
            <Link
              noLinkClass
              href="/voucher/"
              className="page-toolbar-bottom__link js-toolbar-link"
            >
              <i className="las la-gift"></i>
            </Link>
            <Link
              noLinkClass
              href="/login/"
              className="page-toolbar-bottom__link js-toolbar-link"
            >
              <i className="las la-user-circle"></i>
            </Link>
          </React.Fragment>
        );
    }
  };

  render() {
    return (
      <div className="page-toolbar">
        <div
          className="page-toolbar-bottom js-toolbar-bottom"
          id="js-toolbar-bottom"
        >
          <div className="page-toolbar-indicator">
            <div className="page-toolbar-indicator__left"></div>
            <div className="page-toolbar-indicator__right"></div>
          </div>
          {this.menuToolbar()}
        </div>
      </div>
    );
  }
}
