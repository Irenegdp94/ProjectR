//Modelo de deposito

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tankSchema = new Schema({
    nameTank: {type: String, required: true},
    capacity: {type: Number, required: true},
    currentLitres: {type: Number},

    works: [{type: Schema.Types.ObjectId, ref: "Work"}]
},
{
    timestamps: true,
})

const Tank = mongoose.model("Tank", tankSchema);
module.exports = Tank;