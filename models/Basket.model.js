const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const basketSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cure",
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
});

const Basket = mongoose.model("Basket", basketSchema);

module.exports = Basket;
