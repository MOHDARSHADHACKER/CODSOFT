import React, { Component } from "react";
import authService from "../services/auth.service";
import { Link } from "react-router-dom";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            isSubmitted: false,
        };
    }

    onChangeName = (e) => {
        this.setState({ name: e.target.value });
    };

    onChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    };

    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    };

    signUp = () => {
        let data = {
            username: this.state.name,
            email: this.state.email,
            password: this.state.password
        };

        authService.register(data)
            .then(response => {
                console.log(response);
                this.setState({ isSubmitted: true })
                // this.props.history.push('/home');
            })
            .catch(e => {
                console.log(e);
            });
    };

    render() {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    {this.state.isSubmitted ? <div className="text-center">
                        <h4>You registred successfully!</h4>
                        <Link className="btn btn-success mt-3" to={'/login'}>
                            Login
                        </Link>
                    </div> : <div className="col-md-6 col-lg-4">
                        <div className="card p-4">
                            <h1 className="text-center mb-4">Registration Form</h1>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Enter Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    placeholder="Name"
                                    required
                                    onChange={(e) => this.onChangeName(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Enter Email-Id</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="Email"
                                    required
                                    onChange={(e) => this.onChangeEmail(e)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Enter Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Password"
                                    required
                                    onChange={(e) => this.onChangePassword(e)}
                                />
                            </div>
                            <button
                                onClick={this.signUp}
                                className="btn btn-success w-100"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>}
                </div>
            </div>
        );
    }
}
