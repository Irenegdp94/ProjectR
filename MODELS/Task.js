//Modelo tareas
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = new Schema({
    nameTask: {type: String, required: true},
    category: {type: String, required: true},
    

    works: [{type: Schema.Types.ObjectId, ref: "Work"}],
    deleted: {type: Boolean}
},
{
    timestamps: true,
})

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;