import { SERVER_APP } from "../constants/config";
import imgAvatarNull from "./../assets/images/avatar-null.png";
import imgAvatarNull2 from "./../assets/images/avatar-null2.png";
import imgNoProduct from "./../assets/images/no-image-product.png";
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');

//Format VNĐ
export const formatPriceVietnamese = (price) => {
    if (typeof price === 'undefined') return;
    return price.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
};

//format date service
export const formatDateSv = (date) => {
    if (date === null) return false;
    const dateSv = date.split("T")[0];
    const dateTo = dateSv.split("-");
    return dateTo[2] + "/" + dateTo[1] + "/" + dateTo[0];
}
export const formatDateNotYYYY = (date) => {
    if (date === null) return false;
    const dateSv = date.split("T")[0];
    const dateTo = dateSv.split("-");
    return dateTo[2] + "-" + dateTo[1];
}
export const formatDateBirday = (date) => {
    if (date === null || date === undefined) return false;
    const dateSv = date.split("T")[0];
    const dateTo = dateSv.split("-");
    return dateTo[2] + "." + dateTo[1] + "." + dateTo[0];
}
export const formatDateUTC = (date) => {
    var date = new Date(date),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
}

// Check Sale 
export const checkSale = (SaleBegin, SaleEnd) => {
    var todaydate = new Date();
    if (
        Date.parse(todaydate) < Date.parse(SaleEnd) &&
        Date.parse(SaleBegin) <= Date.parse(todaydate)
    ) {
        return true;
    } else {
        return false;
    }
};

//Tính phần trăm sale Product
export const percentagesSale = (Price, PriceSale) => {
    return 100 - ((PriceSale / Price) * 100);
}

//Check avatar Null
export const checkImageProduct = (src) => {
    if (src === "null.gif" || src === "") {
        return imgNoProduct;
    } else {
        return SERVER_APP + "/Upload/image/" + src;
    }
}
export const checkAvt = (src) => {
    if (src === "null.gif" || src === "") {
        return imgAvatarNull;
    } else {
        return SERVER_APP + "/Upload/image/" + src;
    }
}
export const checkAvt2 = (src) => {
    if (src === "null.gif" || src === "") {
        return imgAvatarNull2;
    } else {
        return SERVER_APP + "/Upload/image/" + src;
    }
}

// Get date max book
export const maxBookDate = (services) => {
    var max = '';
    services && services.map((x) => {
        if (x.BookDate && x.BookDate > max) max = x.BookDate;
    })
    if (max) {
        return moment(max).fromNow()
    }
    return max;
}

export const getDateFacebook = (date) => {
    return moment(date).startOf('day').fromNow();
}

// validateEmail
export const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Kiểm tra số ngày tới
export const checkDateDiff = (dateEnd) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date();
    const secondDate = new Date(dateEnd);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
}

//Group item theo ngày
export const groupbyDDHHMM = (arr) => {
    const newArr = [];
    if (!arr) return false;
    arr.map(item => {
        const dayFull = item.CreateDate;
        const d = dayFull.split('T')[0];
        var g = null;
        newArr.every((_g) => {
            if (_g.day == d) g = _g;
            return g == null;
        })
        if (g == null) {
            g = {
                day: d,
                dayFull: dayFull,
                items: []
            };
            newArr.push(g);
        }
        g.items.push(item);
    })
    return newArr;
}