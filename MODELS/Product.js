const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
    nameProduct: {type: String, required: true},
    nREF: {type: String, required: true},
    pricePurchase: {type: Number, required: true},
    
    works: [{type: Schema.Types.ObjectId, ref: "Work"}],
    deleted: {type: Boolean, default:false}
},
{
    timestamps: true,
})

const Product = mongoose.model("Product", productSchema);
module.exports = Product;