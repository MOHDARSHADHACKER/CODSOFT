import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import ProjectDataService from "../services/project.service";
import { useNavigate } from "react-router-dom";
import userService from "../services/user.service";

export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.newTutorial = this.newTutorial.bind(this);
    this.onChangeDeadLine = this.onChangeDeadLine.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      published: false,
      submitted: false,
      projects: [],
      developers: [],
      selectedDeveloper: null,
      selectedProject: null,
      deadLine: 1,
    };
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  onChangeDeadLine(e) {
    this.setState({ deadLine: e.target.value });
  }

  getProjectListForDropdown() {
    
  }

  onChangeDescription(e) {
    this.setState({ description: e.target.value });
  }

  saveTask() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      projectId: this.state.selectedProject,
      userId: this.state.selectedDeveloper,
      deadLine: this.state.deadLine,
      status: this.state.selectedDeveloper ?  'assigned' : 'not_assigned',
    };
console.log('data:::', data)
    TaskDataService.create(data)
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

  newTutorial() {
    this.setState({
      id: null,
      title: "",
      description: "",
    });
  }

  retrieveProjects = () => {
    ProjectDataService.getAll()
      .then(response => {
        console.log('resp:::', response.data)
        this.setState({projects: response.data},()=> console.log('projuc:::', this.state.projects));

      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveDevelopers = () => {
    userService.getAllDevelopers()
      .then(response => {
        console.log('develp:::', response.data)
        this.setState({developers: response.data},()=> console.log('develop:::', this.state.developers));

      })
      .catch(e => {
        console.log(e);
      });
  }

  onChangeProject= (e)=>{
    console.log('e:::', e.target.value)
    this.setState({selectedProject: e.target.value})
  }

  onChangeDeveloper= (e)=>{
    this.setState({selectedDeveloper: e.target.value})
  }

  componentDidMount(){
    this.retrieveProjects();
    this.retrieveDevelopers();
    
  }
   

  render() {
    return (
      <div className="container mt-5">
        {this.state.submitted ? (
          <div className="text-center">
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success mt-3" onClick={this.newTutorial}>
              Add New
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-center mb-4">Add a New Task</h2>
            <form>
            <div className="form-group">
                <label htmlFor="title">Project:</label>
                <select
                  onChange={this.onChangeProject}>
                   {this.state.projects && this.state.projects.map((project)=>{
                    return <option value={project._id}>{project.title}</option>
                   }) }
                  </select>
              </div>
              <div className="form-group">
                <label htmlFor="title">Assing To:</label>
                <select
                  onChange={this.onChangeDeveloper}>
                   {this.state.developers && this.state.developers.map((developer)=>{
                    return <option value={developer._id}>{developer.username}</option>
                   }) }
                  </select>
              </div>
              <div className="form-group mt-3">
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
                <label htmlFor="deadLine">Dead line( in days):</label>
                <input
                  type="text"
                  className="form-control"
                  id="deadLine"
                  required
                  value={this.state.deadLine}
                  onChange={this.onChangeDeadLine}
                  name="deadLine"
                />
              </div>

              <div className="form-group mt-3">
                <button type="button" onClick={this.saveTask} className="btn btn-primary">
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
