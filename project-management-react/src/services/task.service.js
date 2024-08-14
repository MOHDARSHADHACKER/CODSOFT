import http from "../http-common";
import authHeader from './auth-header';
class TaskDataService {
    getAll(projectId) {
        return http.get(`/task?projectId=${projectId}`);
    }


    get(id) {
        return http.get(`/task/${id}`);
    }

    create(data) {
        return http.post("/task", data,{ headers: authHeader() });
    }

    update(id, data) {
        return http.post(`/task/${id}`, data);
    }

    delete(id) {
        return http.delete(`/task/${id}`);
    }

    deleteAll() {
        return http.delete(`/task`);
    }

    findByTitle(title) {
        return http.get(`/task?title=${title}`);
    }
}

export default new TaskDataService();


