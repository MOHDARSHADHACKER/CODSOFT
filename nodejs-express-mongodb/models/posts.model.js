const { Schema } = require("mongoose");

module.exports  = mongoose => {
    const Post = mongoose.model(
        "posts",
        mongoose.Schema(
            {
                title: String,
                description: String,
                published: Boolean,
                userId: [{type: Schema.Types.ObjectId, ref: "User"}]
            },
            { timestamps: true }
        )
    );

    return Post;
};