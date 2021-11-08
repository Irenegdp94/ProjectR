//Modelo usuario
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    nUser: {type: String, required: true},
    nameUser: {type: String, uppercase: true, required: true},
    surnameUser: {type: String, uppercase: true, required: true},
    password: {type: String, required: true},
    phone: {type: Number},
    roleUser: {type: String, required: true},

    works: [{type: Schema.Types.ObjectId, ref: "Work"}]
},
{
    timestamps: true,
})

const User = mongoose.model("User", userSchema);
module.exports = User;