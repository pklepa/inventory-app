const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO: Modify GameSchema to support multiple platforms.
// TODO: Find a way to allow specific consoles as well (PS5, Switch, 64, XBox 360, etc...)
const GameSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 800 },
  categories: [
    { type: Schema.Types.ObjectId, required: true, ref: "Category" },
  ],
  platform: [
    {
      type: String,
      enum: ["PC", "Console", "Mobile", "Other"],
      default: "PC",
    },
  ],
  price: { type: Number },
  imgUrl: { type: String },
});

// Virtual for game's URL
GameSchema.virtual("url").get(function () {
  return "/inventory/game/" + this._id;
});

//Export model
module.exports = mongoose.model("Game", GameSchema);
