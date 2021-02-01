import ShopDataService from "../service/shop.service";
import NewsPage from '../pages/news/news.jsx';
import NewsListPage from '../pages/news/newsList.jsx';
import NewsDetailPage from '../pages/news/newsDetail';

import ShopPage from '../pages/shop/shop';
import ShopCatePage from '../pages/shop/shopCate';
import ShopListProductPage from '../pages/shop/shopListProduct';
import ShopListServicePage from '../pages/shop/shopListService';
import ShopDetailPage from '../pages/shop/shopDetail';
import ShopPayPage from '../pages/shop/shopPay';
import ShopPayInfoPage from '../pages/shop/ShopPayInfo';
import ShopPaySuccessPage from '../pages/shop/shopPaySuccess';

import MapsPage from '../pages/maps/maps';

import SalePromotionPage from '../pages/promotion/sale';

import LoginPage from '../pages/user/login';
import RegistrationPage from '../pages/user/registration';
import NotificationPage from '../pages/user/Notification';
import ProfilePage from '../pages/user/profile';
import DetailProfilePage from '../pages/user/DetailProfile';
import CardServicePage from '../pages/user/cardService'; //Thẻ dịch vụ
import SchedulePage from '../pages/user/schedule'; //Đặt lịch
import VoucherPage from '../pages/user/voucher'; // Mã giảm giá
import WalletPage from '../pages/user/Wallet'; // Ví điện tử
import DiaryPage from '../pages/user/Diary'; // Nhật ký
import OrderPage from '../pages/user/Order';
import RatingListPage from '../pages/user/RatingList';
import BarCodePage from '../pages/user/barcode';
import EditEmailPage from '../pages/user/editEmail';
import EditPasswordPage from '../pages/user/editPassword';

import DynamicRoutePage from '../pages/dynamic-route.jsx';
import NotFoundPage from '../pages/404.jsx';

function checkAuth(to, from, resolve, reject) {
    var router = this;
    if (localStorage.getItem("user")) {
        resolve();
    } else {
        reject();
        router.navigate('/login/');
    }
}

var routes = [{
        path: '/',
        component: NewsPage
    },
    {
        path: '/news/',
        component: NewsPage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/news-list/',
        component: NewsListPage,
    },
    {
        path: '/news/detail/:postId/',
        component: NewsDetailPage,
    },
    {
        path: '/shop/',
        component: ShopPage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/pay/',
        component: ShopPayPage,
        beforeEnter: checkAuth
    },
    {
        path: '/pay-info/',
        component: ShopPayInfoPage
    },
    {
        path: '/pay-success/:orderID',
        component: ShopPaySuccessPage
    },
    {
        path: '/shop/:cateId',
        async(routeTo, routeFrom, resolve, reject) {
            const cateID = routeTo.params.cateId;

            ShopDataService.getCate(cateID)
                .then((response) => {
                    const arrCate = response.data;
                    if (arrCate.length > 0) {
                        resolve({
                            component: ShopCatePage,
                        });
                    } else {
                        resolve({
                            component: ShopListProductPage,
                        });
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    },
    {
        path: '/shop/list/:parentId/:cateId',
        async(routeTo, routeFrom, resolve, reject) {
            const cateParentID = routeTo.params.parentId;
            if (cateParentID === "795") {
                resolve({
                    component: ShopListServicePage,
                });
            } else {
                resolve({
                    component: ShopListProductPage,
                });
            }
        }
        //component: ShopListPage,
    },
    {
        path: '/shop/detail/:cateId',
        async(routeTo, routeFrom, resolve, reject) {},
        component: ShopDetailPage,
    },
    {
        path: '/maps/',
        component: MapsPage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/login/',
        component: LoginPage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/registration/',
        component: RegistrationPage,
        options: {
            transition: 'f7-cover-v',
        }
    },
    {
        path: '/profile/',
        component: ProfilePage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/detail-profile/',
        component: DetailProfilePage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/edit-email/',
        component: EditEmailPage
    },
    {
        path: '/edit-password/',
        component: EditPasswordPage
    },
    {
        path: '/cardservice/', // Thẻ dịch vụ
        component: CardServicePage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/schedule/', // Thẻ dịch vụ
        component: SchedulePage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/barcode/', // Check In
        component: BarCodePage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/voucher/', // Mã giảm giá
        component: VoucherPage
    },
    {
        path: '/wallet/', // Ví điện tử
        component: WalletPage
    },
    {
        path: '/diary/', // Nhật ký
        component: DiaryPage
    },
    {
        path: '/rating/', // Nhật ký
        component: RatingListPage
    },
    {
        path: '/notification/', // Thông báo Noti
        component: NotificationPage,
        beforeEnter: checkAuth
    },
    {
        path: '/order/', // Đơn hàng
        component: OrderPage
    },
    {
        path: '/sale-post/', // Thông báo Noti
        component: SalePromotionPage
    },
    {
        path: '(.*)',
        component: NotFoundPage,
    },
];

export default routes;