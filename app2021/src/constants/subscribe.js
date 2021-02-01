import { subscribe } from "../constants/user";
import UserService from "../service/user.service";
export const setSubscribe = (userData, PWD) => {
    if (!userData) return false;

    const USN = userData.MobilePhone;
    const IsUser = userData.acc_type === "M" ? 0 : 1
    if (IsUser) {
        data.StockID = userData.ByStockID;
    }
    UserService.getSubscribe(USN, PWD, IsUser)
        .then(response => {
            const data = response.data;
            subscribe(data);
        })
        .catch(er => console.log(er));

    // p.USN = USN;
    // p.PWD = PWD;
    // p.IsUser = IsUser; // = 0 => khach hang, = 1 => user
    // if (IsUser) {
    //     p.StockID = StockID;
    // }
    // var cmd = p.cmd;
    // console.log(p);
    // $.getJSON(SERVER + '/app/index.aspx', p, function (rt) {
    //     if (rt && rt.error && cmd !== 'authen') {
    //         if (rt.error === 'REQUIRE_LOGIN') {
    //             //ResetUI();
    //             //Login();
    //             //return;
    //             REQUIRE_LOGIN = true;
    //             $('body').trigger('authen_change');
    //         } else {
    //             REQUIRE_LOGIN = false;
    //         }
    //     }
    //     fn && fn(rt);
    //     if (p.cmd === 'authen') {
    //         window.MemberID = rt.acc_type === 'M' ? rt.acc_id : 0;
    //         window.UID = rt.acc_type === 'U' ? rt.acc_id : 0;
    //         window.EToken = rt.etoken;
    //         console.log(rt);
    //         //
    //         subscribe(rt);//#4328
    //         //

    //         $('body').trigger('authen_change');
    //     }
    // }).fail(() => {
    //     error && error();
    // })
}