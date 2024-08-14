import React, { Component } from "react";
import ProjectDataService from "../services/project.service";
import { useNavigate } from "react-router-dom";

export default class AddProject extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.newProject = this.newProject.bind(this);

    this.state = {
      id: null,
      title: "",
      description: ""
    };
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  onChangeDescription(e) {
    this.setState({ description: e.target.value });
  }

  saveProject() {
    var data = {
      title: this.state.title,
      description: this.state.description
    };

    ProjectDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
        });
        console.log(response.data);
        let navigate = useNavigate();
        navigate("/"); 
      })
      .catch(e => {
        console.log(e);
      });
  }

  newProject() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,
      submitted: false
    });
  }

  render() {
    return (
      <div className="container mt-5">
        {this.state.submitted ? (
          <div className="text-center">
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success mt-3" onClick={this.newProject}>
              Add New
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-center mb-4">Add a New Project</h2>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  name="title"
                />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="description">Description:</label>
                <textarea
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>

              <div className="form-group mt-3">
                <button type="button" onClick={this.saveProject} className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}
