//Modelo finca
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const farmSchema = new Schema({
    nameFarm: {type: String, required: true},
    area: {type: Number, required: true},
    cultivo: {type: String, required: true},

    season: [{type: Schema.Types.ObjectId, ref: "Season"}],
    company: [{type: Schema.Types.ObjectId, ref: "Company"}]
},
{
    timestamps: true,
})

const Farm = mongoose.model("Farm", farmSchema);
module.exports = Farm;