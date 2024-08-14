import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onChangeUserName = (e) => {
        setUsername(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const login = () => {
        let data = {
            username: username,
            password: password
        };

        authService.login(data)
            .then(response => {
                console.log(response);
                navigate("/");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4 col-lg-3">
                    <div className="card p-4 shadow-sm">
                        <h2 className="text-center mb-4">Login</h2>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                placeholder="Enter Username"
                                required
                                onChange={onChangeUserName}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Password"
                                required
                                onChange={onChangePassword}
                            />
                        </div>
                        <button
                            onClick={login}
                            className="btn btn-success w-100"
                        >
                            Login
                        </button>
                        <Link
                        to={'/registration'}
                            // className="btn btn-success w-100"
                        >
                            Registration
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
