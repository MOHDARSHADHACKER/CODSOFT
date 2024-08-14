const db = require("../models");
const Comment = db.Comment;

exports.create = (req, res) => {
    if (!req.body.comment) {
        res.status(400).send({ message: "content should not be empty!"});
        return;
    }

    const comment = new Comment({
        
    })
}

