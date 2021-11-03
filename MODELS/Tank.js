//Modelo de deposito

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tankSchema = new Schema({
    nameTank: {type: String, required: true},
    capacity: {type: Number, required: true},
    litres: {type: Number},

    //farms: [{type: Schema.Types.ObjectId, ref: "Farm"}]
},
{
    timestamps: true,
})

const Tank = mongoose.model("Tank", tankSchema);
module.exports = Tank;