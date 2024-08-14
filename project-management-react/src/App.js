import React, { Component } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Blog from "./components/blog.component"
import BlogList from "./components/blog-list.component";
import AddBlog from "./components/add-blog.component";
import Login from "./components/login.component";
import Registration from "./components/registration.component";

import PrivateRoute from "./utils/PrivateRoute";
import AddTask from "./components/add-task.component";
import authService from "./services/auth.service";
import ProjectView from "./components/project-view.component";




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null
    }
  }

  componentDidMount(){
    this.setState({loggedInUser: authService.getCurrentUser()}, ()=>console.log('logi:::', this.state.loggedInUser?.token));
  }

  

  logout = () => {
    authService.logout();
    this.setState({loggedInUser: null})

    // this.navigate("/login")
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
           {this.state.loggedInUser?.token && <a className="navbar-brand" href="#">{this.state.loggedInUser?.role}</a>}
            {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button> */}
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              {this.state.loggedInUser?.token && this.state.loggedInUser?.role === 'projectManager' && <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/add">Add Project</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/task/add">Add Task</a>
                </li>
              </ul>}
             {this.state.loggedInUser?.token && <form class="d-flex">
            
                <a href="/login"><button className="btn btn-danger"  onClick={this.logout}>Logout</button></a>
              </form>}
            </div>
          </div>
        </nav>

        <div className="mt-3">
          <Routes>
            <Route exact path='/' element={<PrivateRoute />}>
              <Route path="/" element={<BlogList />} />
            </Route>

            <Route exact path='/blogs' element={<PrivateRoute />}>
              <Route path="/blogs" element={<BlogList />} />
            </Route>


            <Route exact path='/add' element={<PrivateRoute />}>
              <Route exact path='/add' element={<AddBlog />} />
            </Route>
            <Route exact path='/blogs/:id' element={<PrivateRoute />}>
              <Route path="/blogs/:id" element={<Blog />} />
            </Route>

            <Route exact path='/task/add' element={<PrivateRoute />}>
              <Route exact path='/task/add' element={<AddTask />} />
            </Route>

            <Route exact path='/project/:id' element={<PrivateRoute />}>
              <Route path="/project/:id" element={<ProjectView />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </div>

      </div>
    );
  }
}
export default App;
