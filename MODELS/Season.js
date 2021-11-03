//Modelo de campaña
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const seasonSchema = new Schema({
    
    dateINI: {type: Date, required: true},
    dateEND: {type: Date, required: true},

    //works: [{type: Schema.Types.ObjectId, ref: "Work"}]
},
{
    timestamps: true,
})

const Season = mongoose.model("Season", seasonSchema);
module.exports = Season;