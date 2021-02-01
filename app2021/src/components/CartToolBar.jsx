import React from "react";
import { Link } from "framework7-react";
import { getUser } from "../constants/user";
import ShopDataService from "../service/shop.service";
export default class CartToolBar extends React.Component {
  constructor() {
    super();
    this.state = {
      countOrder: 0,
    };
  }
  componentDidMount() {
    this.getOrder();
  }
  getOrder = () => {
    const infoUser = getUser();
    if (!infoUser) {
      return false;
    }

    const data = {
      order: {
        ID: 0,
        SenderID: infoUser.ID,
        VCode: "",
      },
      addProps: "ProdTitle",
    };
    ShopDataService.getUpdateOrder(data)
      .then((response) => {
        const data = response.data.data;
        if (response.data.success) {
          this.setState({
            countOrder: data.items.length,
          });
        }
      })
      .catch((er) => console.log(er));
  };

  render() {
    const { countOrder } = this.state;
    return (
      <Link href="/pay/" noLinkClass className="icon-cart-toolbar">
        <i className="las la-shopping-cart"></i>
        {countOrder > 0 ? <span className="count">{countOrder}</span> : ""}
      </Link>
    );
  }
}
