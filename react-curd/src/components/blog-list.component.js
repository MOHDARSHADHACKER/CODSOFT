import React, { Component, useEffect, useState } from "react";
import TutorialDataService from "../services/post.service";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const BlogList = () => {


  const [posts, setPosts] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("[]");
  const [isCommentOpened, setIsCommentOpened] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [comments, setComments] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    retrieveTutorials();
  }, [])

  const onChangeComment = (e) => {
    setComments(e.target.value)
  }

  const onChangeSearchTitle = (e) => {
    setSearchTitle(e.target.value)
  }

  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then(response => {
        setPosts(response.data);

      })
      .catch(e => {
        console.log(e);
      });
  }

  const refreshList = () => {
    retrieveTutorials();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  }

  const setActiveTutorial = (post, index) => {
    setCurrentIndex(index);
    setCurrentTutorial(post)
  }

  const removeAllTutorials = () => {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  const searchTitleHandler = () => {
    TutorialDataService.findByTitle(searchTitle)
      .then(response => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const logout = () => {
    authService.logout();
    navigate("/login")
  }

  const images = ['image2', 'image3', 'image4', 'image5']
  return (
    <>
      <div className="d-flex">
        <div className="card-container-a p-2">
          <div className="card-a">
            <div className="left-side-bar">
              <div className="card-content-a">
                <h1>Panetra</h1>
                <h6>Creative React Blog Template</h6>
                <br></br>
                <div className="">
                <Link to="/" className="btn btn-primary me-2 p-1">Home</Link>
                <Link to="/add" className="btn btn-secondary me-2 p-1">New Post</Link>
                <button className="btn btn-danger" onClick={logout}>Logout</button>
                </div>
               
              </div>
            </div>
          </div>
        </div>



        <div>

          <div className="d-flex row">
            <div className="title col-sm-9"><h1>Our Stories</h1> </div>
            <div className=" col-sm-3">
              <div className="input-group mb-3">
                <input className="form-control" type="search" placeholder="Enter your keywords?" aria-describedby="basic-addon2" onChange={(e) => onChangeSearchTitle(e)} />
                <i className="input-group-text fa fa-search" onClick={() => searchTitleHandler(searchTitle)}></i>
              </div>
            </div>
          </div>

          <div className="d-flex">
            <div className="main">
              <div className="card-container ">
                <div className="row w-100">

                  {posts ? posts.map((post, index) => {
                    return <div className="col-sm-6">
                      <div className="card">
                        <img src={`./${images[index]}.jpg`} />
                        <div className="card-content">
                          <h3>{post.title}</h3>
                          <p>{post.description}</p>
                          <a href=" " className="btn">Read More</a>
                          <span onClick={() => setIsCommentOpened(!isCommentOpened)}>Comments</span>
                        </div>
                      </div>

                      {
                        isCommentOpened && <div>
                          <input type="text" required onChange={(e) => onChangeComment(e)} />
                          {allComments?.map((comment) => {
                            <div>
                              <p>{comment}</p>
                              <br />

                            </div>

                          })}
                        </div>
                      }
                    </div>
                  }) :
                    <p className="justify-content-center">No Recored Found!</p>
                  }
                </div>

              </div>
            </div>

            <div className="right-side-bar p-2">
              <div>
                <div>
                  <h4>POPULAR POSTs</h4>
                </div>
                <div className="card-popular">
                  <img src="./image5.jpg" />
                </div>
                <h6>RECENT POSTS</h6>
                <div className="p-2">
                  <div className="mb-2">
                    <div className="recent-post">
                      <img src="./image4.jpg" />
                      <div className="card-content-recent">
                        <p> to work around this error. This will make this message.</p>
                        <span>Mar 20, 2023</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="recent-post">
                      <img src="./image3.jpg" />
                      <div className="card-content-recent">
                        <p> to work around this error. This will make this message.</p>
                        <span>Mar 20, 2023</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="recent-post">
                      <img src="./image4.jpg" />
                      <div className="card-content-recent">
                        <p> to work around this error. This will make this message.</p>
                        <span>Mar 20, 2023</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="recent-post">
                      <img src="./image5.jpg" />
                      <div className="card-content-recent">
                        <p> to work around this error. This will make this message.</p>
                        <span>Mar 20, 2023</span>
                      </div>
                    </div>
                  </div>
                  <div className="categories"><h3>CATEGORIES</h3> </div>
                  <div>
                    <div className="d-flex justify-content-between">
                      <p>ALL</p>
                      <span>(50)</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Travel</p>
                      <span>(12)</span>
                    </div> <div className="d-flex justify-content-between">
                      <p>Lifestyle</p>
                      <span>(20)</span>
                    </div> <div className="d-flex justify-content-between">
                      <p>Design</p>
                      <span>(18)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>






    </>


  );
}

export default BlogList;