//Modelo de campaña
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const seasonSchema = new Schema({
    name: {type:String},
    dateINI: {type: Date, required: true},
    dateEND: {type: Date, required: true},

    works: [{type: Schema.Types.ObjectId, ref: "Work"}],
    deleted: {type: Boolean, default:false}

},
{
    timestamps: true,
})

const Season = mongoose.model("Season", seasonSchema);
module.exports = Season;