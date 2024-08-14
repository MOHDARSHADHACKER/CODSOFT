const { Schema } = require("mongoose");
const { mongoose } = require(".");

const taskSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        status: {
            type: String,
            enum: ['not_assigned', 'assigned', 'done'],
            default: 'not_assigned',
        },
        projectId: { type: Schema.Types.ObjectId, ref: "projects" },
        userId: { type: Schema.Types.ObjectId, ref: "users" },
        deadLine: String,
    },
    { timestamps: true }
)

const Tasks = mongoose.model(
    "tasks", taskSchema
);

module.exports = Tasks;