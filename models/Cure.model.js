const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cureSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  isRecipe: {
    type: Boolean,
    default: false,
  },
  cureCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Cure = mongoose.model("Cure", cureSchema);

module.exports = Cure;
