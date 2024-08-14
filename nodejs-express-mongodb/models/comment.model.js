module.exports = mongoose => {
    const Comment = mongoose.model(
        "comment",
        mongoose.Schema(
            {
                userId: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
                postId: [{type: mongoose.Schema.Types.ObjectId, ref: "posts"}],
                comment: String
            },
            { timestamps: true }
        )
    );

    return Comment;

}