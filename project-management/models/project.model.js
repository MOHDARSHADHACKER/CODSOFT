const { Schema } = require("mongoose");

module.exports  = mongoose => {
    const Project = mongoose.model(
        "projects",
        mongoose.Schema(
            {
                title: String,
                description: String,
            },
            { timestamps: true }
        )
    );

    return Project;
};