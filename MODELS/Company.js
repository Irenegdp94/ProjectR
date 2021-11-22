//Modelo empresa
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const companySchema = new Schema({
   nameCompany: {type: String, required: true},
   farms: [{type: Schema.Types.ObjectId, ref: "Farm"}],
   works: [{type: Schema.Types.ObjectId, ref: "Work"}],
   deleted: {type: Boolean, default:false}
},
{
    timestamps: true,
}
)

const Company = mongoose.model("Company", companySchema);
module.exports = Company;