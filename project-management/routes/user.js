const express = require('express');
const { authenticate } = require('../middlewares/auth');
const user = require("../controllers/user.controller")

const router = express.Router();

router.get('/profile', authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}` });
});

router.get("/", user.findAll);

module.exports = router;