const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const machinerySchema = new Schema({
    nameMachinery: {type: String, required: true},
    nREF: {type: String, required: true},
    datePurchase: {type: Date, required: true},
    pricePurchase: {type: Number, required: true},
    priceH: {type: Number, required: true},

    //n: [{type: Schema.Types.ObjectId, ref: "Farm"}]
    works: [{type: Schema.Types.ObjectId, ref: "Work"}]
},
{
    timestamps: true,
})

const Machine = mongoose.model("Machine", machinerySchema);
module.exports = Machine;