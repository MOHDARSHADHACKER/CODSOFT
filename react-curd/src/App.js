import React, { Component } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Link, Route, Routes } from "react-router-dom";
import Blog from "./components/blog.component"
import BlogList from "./components/blog-list.component";
import AddBlog from "./components/add-blog.component";
import Login from "./components/login.component";
import Registration from "./components/registration.component";

import PrivateRoute from "./utils/PrivateRoute";




class App extends Component {
  render() {
    return (
      <div>

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

            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </div>

      </div>
    );
  }
}
export default App;
