import http from "../http-common";

class AuthService {

    async login(data) {
        const response = await http.post('/auth/login', data);
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    }

    logout() {
        localStorage.removeItem("user");
    }


    register(data) {
        return http.post('/auth/register', data)
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

}

export default new AuthService();
