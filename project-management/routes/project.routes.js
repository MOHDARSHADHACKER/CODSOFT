const { authenticate } = require("../middlewares/auth");

module.exports = app => {
  const projects = require("../controllers/project.controller")

  var router = require("express").Router();

  //Create a new project
  router.post("/",authenticate, projects.create);

  // Retreving all projects
  router.get("/", projects.findAll);

  // Retriving all published projects
  router.get("/status", projects.findAllByStatus);

  // Retrieve a single project with id
  router.get("/:id", projects.findOne);

  // update a project with id
  router.put("/:id", projects.update);

  // Delete a project with id
  router.delete("/:id", projects.delete);

  // Delete all projects
  router.delete("/", projects.deleteAll);

  app.use('/api/project', router);
};