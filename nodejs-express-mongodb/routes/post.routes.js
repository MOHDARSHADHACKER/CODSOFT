const { authenticate } = require("../middlewares/auth");

module.exports = app => {
  const posts = require("../controllers/post.controller")

  var router = require("express").Router();

  //Create a new Post
  router.post("/",authenticate, posts.create);

  // Retreving all Posts
  router.get("/", posts.findAll);

  // Retriving all published posts
  router.get("/published", posts.findAllPublished);

  // Retrieve a single post with id
  router.get("/:id", posts.findOne);

  // update a post with id
  router.put("/:id", posts.update);

  // Delete a post with id
  router.delete("/:id", posts.delete);

  // Delete all posts
  router.delete("/", posts.deleteAll);

  
router.post('/comment', comment);

  app.use('/api/posts', router);
};