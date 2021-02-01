import http from "../service/http-common";

class NewsDataService {
    getAll() {
        return http.get("/app/index.aspx?cmd=home2");
    }
    getBannerAdv(name) {
        return http.get(`/app/index.aspx?cmd=adv&pos=${name}`);
    }
    getNewsIdCate(id) {
        return http.get(`api/gl/select2?cmd=art&includeSource=1&channels=${id}`)
    }
    get(id) {
        return http.get(`/tutorials/${id}`);
    }
    getDetailNew(id) {
        return http.get(`/api/v3/article?cmd=get&ids=${id}`);
    }
}

export default new NewsDataService();