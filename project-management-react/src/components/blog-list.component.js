import React, { Component, useEffect, useState } from "react";
import ProjectDataService from "../services/project.service";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { Button } from "react-bootstrap";


const BlogList = () => {


  const [posts, setPosts] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("[]");
  const [isCommentOpened, setIsCommentOpened] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [comments, setComments] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    retrieveProjects();
  }, [])

  const onChangeComment = (e) => {
    setComments(e.target.value)
  }

  const onChangeSearchTitle = (e) => {
    setSearchTitle(e.target.value)
  }

  const retrieveProjects = () => {
    ProjectDataService.getAll()
      .then(response => {
        console.log('projuc:::', response)
        setPosts(response.data);

      })
      .catch(e => {
        console.log(e);
      });
  }

  const refreshList = () => {
    retrieveProjects();
    setCurrentProject(null);
    setCurrentIndex(-1);
  }

  const setActiveProject = (post, index) => {
    setCurrentIndex(index);
    setCurrentProject(post)
  }

  const removeAllProjects = () => {
    ProjectDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  const searchTitleHandler = () => {
    ProjectDataService.findByTitle(searchTitle)
      .then(response => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }



  const images = ['image2', 'image3', 'image4', 'image5']
  return (
    <>
      <div>

        <div className="d-flex row">
          <div className="title col-sm-9"><h1>Project Management</h1> </div>
          <div className=" col-sm-3">
            <div className="input-group mb-3">
              <input className="form-control" type="search" placeholder="Enter your keywords?" aria-describedby="basic-addon2" onChange={(e) => onChangeSearchTitle(e)} />
              <i className="input-group-text fa fa-search" onClick={() => searchTitleHandler(searchTitle)}></i>
            </div>
          </div>
        </div>

        <div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>

              {posts ? posts.map((post, index) => {

                return (<tr>
                  <th scope="row">{index + 1}</th>
                  <td><Link to={`project/${post._id}`}>{post.title}</Link></td>
                  <td>{post.description}</td>
                  <td><Button>Edit</Button></td>
                  <td><Button>Delete</Button></td>
                </tr>)
              }) :
                <p className="justify-content-center">No Recored Found!</p>
              }
            </tbody>
          </table>
        </div>


      </div>

    </>


  );
}

export default BlogList;