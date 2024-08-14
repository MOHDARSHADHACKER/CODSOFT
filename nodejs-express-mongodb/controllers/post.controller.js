const db = require("../models");
const Post = db.posts;


// Create and save a new Post
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
     res.status(400).send({ message: "content can not be empty!"});
     return;
  }
  // Create a post
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
    userId: req.user._id
  });

  // Save post in the database
  post 
    .save(post)
    .then(data => {
      res.send(data);
    })
    .catch(err => { 
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the post."
        });
    });
};

// Retrive all Posts from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i"} } : {};

  Post.find(condition)
    .then(data  => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving posts."
      });
    });
};

//Find a single post with an id
exports.findOne = (req, res)  =>{
  const id = req.params.id;

  Post.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found post with id " +id});
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving post with id=" +id})
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

  Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
     .then(data => {
      if (!data) {
        res.status(404).send({
          mmessage:`Cannot update Post with id=${id}. Maybe Post was not found!`
        });
      } else res.send({ message: "Post with update successfully."});
     })
     .catch(err => {
      console.log('err:::', err)
      res.status(500).send({
        message: "Error updating post with id=" + id
      });
     });

};

//Delete  a post with the specified id in the request
exports.delete = (req, res) =>{
  const id = req.params.id;
  
  Post.findByIdAndDelete(id)
     .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
         });
      } else {
        res.send({
          message: "Post was deleted successfully!"
        });
      }
     })
     .catch(err => {
      res.status(500).send({
        message: "Could not dalate Post with id=" + id
      });
     });
};

//Delete all post from the database.
exports.deleteAll = (req, res) =>{
  Post.deleteMany({})
    .then(data => {
      res.send({
        message: `&{data.deleteCount} Posts were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all posts."
      });
    });
};

//Find all published posts
exports.findAllPublished = (req, res) =>{
  Post.find({ published: true})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    });
};


const comment = async (req, res, next) => {
  const { comment } = req.body;

  try {
      res.json({ message: 'Comment successful' });
  } catch (error) {
      next(error);
  }
};