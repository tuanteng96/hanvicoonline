// return the user data from the storage
export const getUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

// return the password from the storage
export const getPassword = () => {
        return localStorage.getItem('password') || null;
    }
    // return the token from the storage
export const getToken = () => {
    return localStorage.getItem('token') || null;
}

// remove the token and user from the storage
export const removeUserStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('password');
}

// set the token and user from the storage
export const setUserStorage = (token, user, password) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('password', password);
    }
    // get Stock
export const getStockIDStorage = () => {
        return localStorage.getItem('CurrentStockID') || null;
    }
    // set Stock
export const setStockIDStorage = (stockID) => {
        localStorage.setItem('CurrentStockID', stockID);
    }
    // remove Stock
export const removeStockIDStorage = () => {
        localStorage.removeItem('CurrentStockID');
    }
    // get Stock
export const getStockNameStorage = () => {
        return localStorage.getItem('CurrentStockName') || null;
    }
    // set Stock
export const setStockNameStorage = (stockName) => {
        localStorage.setItem('CurrentStockName', stockName);
    }
    // remove Stock
export const removeStockNameStorage = () => {
    localStorage.removeItem('CurrentStockName');
}

//reg notification user
export const subscribe = (rt) => {
    //nếu chưa có key subscribe => ios iphone 8 lỗi
    //vì vậy cần 1 bước phụ để xác định đã có key subscribe=> để unsubscribe
    if (localStorage.getItem('_subscribe'))
        app_request("unsubscribe", "");
    localStorage.setItem('_subscribe', rt);

    //code bên dưới copy từ hàm login
    var topic = [];
    var Firebase_Prefix = 1;
    topic.push('news-' + Firebase_Prefix + '-' + rt.acc_type); //cho loại M(member) || (U)user
    topic.push('news-' + Firebase_Prefix + '-' + rt.acc_type + '-gr-0'); //Mặc định mọi tài khoản đều thuộc nhóm 0 tương ứng với * trong admin
    topic.push('news-' + Firebase_Prefix + '-' + rt.acc_type + '-id-0'); //Mặc định mọi tài khoản là 0 tương ứng với * trong admin

    (rt.acc_group || '').split(',').filter((x) => {
        return x;
    }).forEach((x) => {
        topic.push('news-' + Firebase_Prefix + '-' + rt.acc_type + '-gr-' + x);
    });
    topic.push('news-' + Firebase_Prefix + '-' + rt.acc_type + '-id-' + rt.acc_id);
    //console.log(topic);
    app_request('subscribe', topic.join(','));
}

export const app_request = (cmd, value) => {
    if (window['ANDROID'])
        ANDROID.Do(cmd, value);
    else
        window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.IOS.postMessage({
            "cmd": cmd,
            "value": value
        })
}