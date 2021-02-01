import React from "react";
import {
    Link,
    Toolbar,
} from "framework7-react";
import ShopDataService from '../../service/shop.service';

export default class ScheduleService extends React.Component {
    constructor() {
        super();
        this.state = {
            arrProd : []
        }
    }
    componentDidMount() {
        this.getProd();
    }
    getProd = () => {
        ShopDataService.getProd()
            .then(response => {
                //console.log(response);
            })
            .catch(e => console.log(e));
    }
    render() {
        return (
            <div className="page-toolbar">
                Step 2
            </div>
        )
    }
}