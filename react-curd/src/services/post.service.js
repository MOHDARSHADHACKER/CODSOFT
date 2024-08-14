import http from "../http-common";
import authHeader from './auth-header';
class TutorialDataService {
    getAll() {
        return http.get("/posts");
    }


    get(id) {
        return http.get(`/posts/${id}`);
    }

    create(data) {
        return http.post("/posts", data,{ headers: authHeader() });
    }

    update(id, data) {
        return http.post(`/posts/${id}`, data);
    }

    delete(id) {
        return http.delete(`/posts/${id}`);
    }

    deleteAll() {
        return http.delete(`/posts`);
    }

    findByTitle(title) {
        return http.get(`/posts?title=${title}`);
    }
}

export default new TutorialDataService();


