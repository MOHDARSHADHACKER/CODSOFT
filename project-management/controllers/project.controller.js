const db = require("../models");
const Project = db.project;


// Create and save a new Post
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
     res.status(400).send({ message: "content can not be empty!"});
     return;
  }
  // Create a post
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
  });

  // Save post in the database
  project
    .save(project)
    .then(data => {
      res.send(data);
    })
    .catch(err => { 
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the project."
        });
    });
};

// Retrive all Posts from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = title ? { title: { $regex: new RegExp(title), $options: "i"} } : {};


  Project.find(condition)
    .then(data  => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving projects."
      });
    });
};

//Find a single post with an id
exports.findOne = (req, res)  =>{
  const id = req.params.id;

  Project.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found project with id " +id});
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving project with id=" +id})
    });
};

// Update a post by the id in the request
exports.update = (req, res) =>{
  if (!req.body) {
    return res.status(400).send({
      message:"Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Project.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
     .then(data => {
      if (!data) {
        res.status(404).send({
          mmessage:`Cannot update project with id=${id}. Maybe project was not found!`
        });
      } else res.send({ message: "Project with update successfully."});
     })
     .catch(err => {
      console.log('err:::', err)
      res.status(500).send({
        message: "Error updating project with id=" + id
      });
     });

};

//Delete  a post with the specified id in the request
exports.delete = (req, res) =>{
  const id = req.params.id;
  
  Project.findByIdAndDelete(id)
     .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete project with id=${id}. Maybe project was not found!`
         });
      } else {
        res.send({
          message: "project was deleted successfully!"
        });
      }
     })
     .catch(err => {
      res.status(500).send({
        message: "Could not dalate project with id=" + id
      });
     });
};

//Delete all project from the database.
exports.deleteAll = (req, res) =>{
  Project.deleteMany({})
    .then(data => {
      res.send({
        message: `&{data.deleteCount} projects were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all projects."
      });
    });
};

//Find all published projects
exports.findAllByStatus = (req, res) =>{
  const status = req.query.status;
  Project.find({ status: status})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects."
      });
    });
};