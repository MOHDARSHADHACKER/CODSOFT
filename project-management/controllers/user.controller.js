const Users = require('../models/user');


// Retrive all tasks from the database.
exports.findAll = (req, res) => {
  Users.find({role: 'developer'})
    .then(data  => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving tasks."
      });
    });
};

//Find a single task with an id
exports.findOne = (req, res)  =>{
  const id = req.params.id;

  Tasks.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found task with id " +id});
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving task with id=" +id})
    });
};

// Update a task by the id in the request
exports.update = (req, res) =>{
  if (!req.body) {
    return res.status(400).send({
      message:"Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Tasks.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
     .then(data => {
      if (!data) {
        res.status(404).send({
          mmessage:`Cannot update task with id=${id}. Maybe task was not found!`
        });
      } else res.send({ message: "task with update successfully."});
     })
     .catch(err => {
      console.log('err:::', err)
      res.status(500).send({
        message: "Error updating task with id=" + id
      });
     });

};

//Delete  a task with the specified id in the request
exports.delete = (req, res) =>{
  const id = req.params.id;
  
  Tasks.findByIdAndDelete(id)
     .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete task with id=${id}. Maybe task was not found!`
         });
      } else {
        res.send({
          message: "task was deleted successfully!"
        });
      }
     })
     .catch(err => {
      res.status(500).send({
        message: "Could not dalate task with id=" + id
      });
     });
};

//Delete all task from the database.
exports.deleteAll = (req, res) =>{
  Tasks.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deleteCount} tasks were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tasks."
      });
    });
};