//Modelo empresa
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const companySchema = new Schema({
   nameCompany: {type: String, required: true},
   farms: [{type: Schema.Types.ObjectId, ref: "Farm"}]
},
{
    timestamps: true,
}
)

const Company = mongoose.model("Company", companySchema);
module.exports = Company;