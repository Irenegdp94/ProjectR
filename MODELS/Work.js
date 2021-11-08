//Modelo de trabajos

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const workSchema = new Schema(
  {
    dateINI: { type: Date, required: true }, //fecha y hora
    dateFIN: { type: Date, required: true },

    farm: [{ type: Schema.Types.ObjectId, ref: "Farm" }],
    worker: { type: Schema.Types.ObjectId, ref: "User" },
    task: { type: Schema.Types.ObjectId, ref: "Task" },
    machinery: [{ type: Schema.Types.ObjectId, ref: "Machinery" }],
    tank: { type: Schema.Types.ObjectId, ref: "Tank" },
    litres_tank: { type: Number },
    products: [
      {
        //name: { type: Schema.Types.ObjectId, ref: "Product" },
        name_pr: {type: String},
        litres: { type: Number },
      }
    ],

    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Work = mongoose.model("Work", workSchema);
module.exports = Work;
