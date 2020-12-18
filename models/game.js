const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 800 },
  genre: [{ type: Schema.Types.ObjectId, required: true, ref: "Genre" }],
  platform: [{ type: Schema.Types.ObjectId, required: true, ref: "Platform" }],
  price: { type: Number },
  imgUrl: { type: String },
});

// Virtual for game's URL
GameSchema.virtual("url").get(function () {
  return "/game/" + this._id;
});

//Export model
module.exports = mongoose.model("Game", GameSchema);
