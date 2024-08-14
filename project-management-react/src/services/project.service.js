import http from "../http-common";
import authHeader from './auth-header';
class ProjectDataService {
    getAll() {
        return http.get("/project");
    }


    get(id) {
        return http.get(`/project/${id}`);
    }

    create(data) {
        return http.post("/project", data,{ headers: authHeader() });
    }

    update(id, data) {
        return http.post(`/project/${id}`, data);
    }

    delete(id) {
        return http.delete(`/project/${id}`);
    }

    deleteAll() {
        return http.delete(`/project`);
    }

    findByTitle(title) {
        return http.get(`/project?title=${title}`);
    }
}

export default new ProjectDataService();


