const { authenticate } = require("../middlewares/auth");
const express = require("express");


  const tasks = require("../controllers/task.controller")

  const router = express.Router();

  //Create a new task
  router.post("/",authenticate, tasks.create);

  // Retreving all Posts
  router.get("/", tasks.findAll);

  // Retriving all published tasks
  router.get("/published", tasks.findAllPublished);

  // Retrieve a single task with id
  router.get("/:id", tasks.findOne);

  // update a task with id
  router.put("/:id", tasks.update);

  // Delete a task with id
  router.delete("/:id", tasks.delete);

  // Delete all tasks
  router.delete("/", tasks.deleteAll);

  module.exports = router;