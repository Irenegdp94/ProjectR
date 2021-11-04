//Modelo de trabajos

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const workSchema = new Schema({
    date: {type: Date, required: true},
    INItime: {type: Date, required: true}, 
    FINtime: {type: Date, required: true},
        
    farm: [{type: Schema.Types.ObjectId, ref: "Farm"}],
    worker: {type: Schema.Types.ObjectId, ref: "User"},
    machinery: [{type: Schema.Types.ObjectId, ref: "Machinery"}],
    tank: {type: Schema.Types.ObjectId, ref: "Tank"},
    litres: {type: Number},
    task: {type: Schema.Types.ObjectId, ref: "Task"}

},
{
    timestamps: true,
})

const Work = mongoose.model("Work", workSchema);
module.exports = Work;