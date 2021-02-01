import React from "react";
import { Page, Link, Navbar, Toolbar, Tabs, Tab, Row, Col } from "framework7-react";
import UserService from "../../service/user.service";
import { setStockIDStorage, getStockIDStorage, setStockNameStorage } from "../../constants/user";
import IconLocation from "../../assets/images/location1.svg";
import Slider from "react-slick";
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');

export default class ScheduleSpa extends React.Component {
    constructor() {
        super();
        this.state = {
            arrListDate: [], // Hiển thị 3 ngày từ ngày today next
            arrStock: [], // List Stock
            bookDate: "", // Ngày đặt lịch
        };
    }

    componentDidMount() {
        this.listDate();
        this.getStock();
        const gettoday = moment();
        const bookDateDefault = moment(gettoday).format("DD/MM/YYYY");

        const CurrentStockID = getStockIDStorage();
        this.setState({
            CurrentStockID: CurrentStockID,
            width: window.innerWidth,
            bookDate: bookDateDefault,
        });
    }

    group = (items, n) => items.reduce((acc, x, i) => {
        const idx = Math.floor(i / n);
        acc[idx] = [...(acc[idx] || []), x];
        return acc;
    }, []);

    getStock = () => {
        UserService.getStock()
            .then(response => {
                const ListStock = response.data.data.all;
                const arrStock = [];

                ListStock.map((item) => {
                    if (item.ID !== 778) {
                        arrStock.push(item);
                    }
                });

                this.setState({
                    arrStock: arrStock
                });
            })
    }

    listDate = () => {
        const gettoday = moment();
        const arrListDate = [];
        const arrListTime = [];
        for (let day = 0; day <= 630; day += 15) {
            var time = moment("2020-11-05T07:30:00").add(day, 'm').format('LT');
            var timeFull = moment("2020-11-05T07:30:00").add(day, 'm').format('LTS');
            var item = {
                time: time,
                fullTime: timeFull
            }
            arrListTime.push(item);
        }

        for (let day = 0; day <= 2; day++) {
            switch (day) {
                case 0:
                    var todayFormat = moment(gettoday).add(day, 'days').format("DD/MM");
                    var today = moment(gettoday).add(day, 'days').format("DD/MM/YYYY");
                    var item = {
                        dateFormat: "Hôm nay " + todayFormat,
                        date: today,
                        name: "today",
                        arrtime: arrListTime
                    }
                    arrListDate.push(item);
                    break;
                case 1:
                    var tomorrowFormat = moment(gettoday).add(day, 'days').format("DD/MM");
                    var tomorrow = moment(gettoday).add(day, 'days').format("DD/MM/YYYY");
                    var item = {
                        dateFormat: "Ngày mai " + tomorrowFormat,
                        date: tomorrow,
                        name: "tomorrow",
                        arrtime: arrListTime
                    }
                    arrListDate.push(item);
                    break;

                default:
                    var tomorrowAfterFormat = moment(gettoday).add(day, 'days').format("DD/MM");
                    var tomorrowAfter = moment(gettoday).add(day, 'days').format("DD/MM/YYYY");
                    var item = {
                        dateFormat: "Ngày kia " + tomorrowAfterFormat,
                        date: tomorrowAfter,
                        name: "tomorrowAfter",
                        arrtime: arrListTime
                    }
                    arrListDate.push(item);
                    break;
            }
        }
        this.setState({
            arrListDate: arrListDate
        })
    }

    formatTime = (time) => {
        return time.replace(":", "h");
    }
    checkTime = (date,time) => {
        const datetime = date + " " + time;

        const todayDate = moment(new Date()).format('L');
        const todayTime = moment(new Date()).format('LTS');
        const todayHome = todayDate + " " + todayTime;
        
        if(Date.parse(datetime) < Date.parse(todayHome)) {
            return " not-time";
        }
        else {
            return ""
        }
    }
    handStyle = () => {
        const _width = (this.state.width / 4) - 12;
        return Object.assign({
            width: _width,
        });
    }

    onDateChanged = (event) => {
        const target = event.target;
        const value = target.value;
        console.log(value);
    }

    render() {
        const { arrListDate, arrStock } = this.state;
        const CurrentStockID = this.state.CurrentStockID && this.state.CurrentStockID;
        const settings = {
            className: "slider variable-width",
            dots: false,
            arrows: false,
            infinite: true,
            centerMode: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
        };
        return (
            <div className="page-schedule__box">
                <div className="page-schedule__location">
                    <h5>1. Chọn spa gần bạn</h5>
                    <div className="page-schedule__location-list">
                        <Row>
                            {
                                arrStock && arrStock.map((item, index) => (
                                    <Col width="50" key={index}>
                                        <div className="location">
                                            <div className="location-item">
                                                <input
                                                    id={"location-" + item.ID}
                                                    type="radio"
                                                    name="checklocation"
                                                    value={item.ID}
                                                    defaultChecked={parseInt(CurrentStockID) === item.ID} />
                                                <label htmlFor={"location-" + item.ID}>{item.Title}</label>
                                                <div className="icon">
                                                    <img src={IconLocation} alt="Location" />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            }
                        </Row>
                    </div>
                </div>
                <div className="page-schedule__time">
                    <h5>2. Chọn thời gian</h5>
                    <div className="page-schedule__date">
                        <Row>
                            {
                                arrListDate && arrListDate.map((item, index) => (
                                    <Col width="33" key={index}>
                                        <Link noLinkClass tabLink={"#tab-" + item.name} tabLinkActive={index === 0 ? true : false}>
                                            <input type="radio" onChange={this.onDateChanged} name="checkdate" value={item.date} />
                                            <span>{item.dateFormat}</span>
                                        </Link>
                                    </Col>
                                ))
                            }
                        </Row>
                    </div>
                    <div className="page-schedule__note">
                        <div className="page-schedule__note-item">
                            <div className="box box-not"></div>
                            <span>Hết chỗ</span>
                        </div>
                        <div className="page-schedule__note-item">
                            <div className="box box-no"></div>
                            <span>Còn chỗ</span>
                        </div>
                        <div className="page-schedule__note-item">
                            <div className="box box-succes"></div>
                            <span>Đang chọn</span>
                        </div>
                    </div>
                    <Tabs animated>
                        {

                            arrListDate && arrListDate.map((item, index) => (
                                <Tab key={index} id={"tab-" + item.name} className="page-tab-location" tabActive={index === 0 ? true : false}>
                                    <div className="page-schedule__time-list">
                                        <Slider {...settings}>
                                            {
                                                this.group(item.arrtime, 4).map((children, k) =>
                                                    <div className="group-time" style={this.handStyle()} key={k}>
                                                        {
                                                            children.map((sub, i) => (
                                                                <div className={"group-time__item" + this.checkTime(item.date,sub.fullTime)} key={i}>
                                                                    <input value={sub.time} id={sub.time} type="radio" name="checktime" />
                                                                    <label a={item.date} htmlFor={sub.time}>{this.formatTime(sub.time)}</label>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                )
                                            }
                                        </Slider>
                                    </div>
                                </Tab>
                            ))
                        }
                    </Tabs>
                </div>
            </div>
        )
    }
}