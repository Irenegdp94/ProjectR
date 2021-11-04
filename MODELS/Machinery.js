const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const machinerySchema = new Schema({
    nameMachinery: {type: String, required: true},
    nREF: {type: String, required: true},
    datePurchase: {type: Date, required: true},
    priceH: {type: Number, required: true},

    //n: [{type: Schema.Types.ObjectId, ref: "Farm"}]
},
{
    timestamps: true,
})

const Machinery = mongoose.model("Machinery", machinerySchema);
module.exports = Machinery;