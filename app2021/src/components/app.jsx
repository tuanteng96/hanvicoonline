import React from "react";
import { App, View } from "framework7-react";
import routes from "../js/routes";

var setEvents = false;

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      // Framework7 Parameters
      f7params: {
        name: "Hanvico Online", // App name
        theme: "auto", // Automatic theme detection
        id: "vn.hanvicoonline",
        // App routes
        routes: routes,
        on: {
          init: function () {
            console.log("Mở lên");
          },
          pageInit: function () {
            console.log("Khi quay lại");
          },
        },
        view: {
          routesBeforeEnter: function (to, from, resolve, reject) {
            resolve();
          },
        },
      },
    };
  }
  render() {
    return (
      <App params={this.state.f7params}>
        {/* Your main view, should have "view-main" class */}
        <View main className="safe-areas" url="/" />
      </App>
    );
  }

  notiDefault = (event) => {
    this.$f7.views.main.router.navigate("/notification/");
  };

  notiCateProdID = (evt) => {
    this.$f7.views.main.router.navigate(`/shop/list/794/${evt.data.id}`);
  }

  notiProdID = (evt) => {
    this.$f7.views.main.router.navigate(`/shop/detail/${evt.data.id}`);
  };

  notiArtID = (evt) => {
    this.$f7.views.main.router.navigate(`/news/detail/${evt.data.id}`);
  }

  notiVoucher = (evt) => {
    this.$f7.views.main.router.navigate(`/voucher/`);
  }

  componentDidMount() {
    this.$f7ready((f7) => {
      var $$ = this.Dom7;
      $$("#preload").remove();

      window.APP_READY = true;
      // const self = this;
      // self.$f7.dialog.preloader('Loading ...');
      // setTimeout(() => {
      //   self.$f7.dialog.close();
      // }, 2000);
      document.body.addEventListener("noti_click.go_noti", this.notiDefault);
      document.body.addEventListener("noti_click.prod_id", this.notiProdID);
      document.body.addEventListener("noti_click.art_id", this.notiArtID);
      document.body.addEventListener(
        "noti_click.cate_prod_id",
        this.notiCateProdID
      );
      document.body.addEventListener("noti_click.voucher_id", this.notiVoucher);
    });
  }

  componentWillUnmount() {
    document.body.removeEventListener("noti_click.go_noti", this.notiDefault);
    document.body.removeEventListener("noti_click.prod_id", this.notiProdID);
    document.body.removeEventListener("noti_click.art_id", this.notiArtID);
    document.body.removeEventListener(
      "noti_click.cate_prod_id",
      this.notiCateProdID
    );
    document.body.removeEventListener(
      "noti_click.voucher_id",
      this.notiVoucher
    );
  }
}
