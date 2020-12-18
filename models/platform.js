const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlatformSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  brand: [{ type: Schema.Types.ObjectId, required: true, ref: "Brand" }],
});

// Virtual for platform's URL
PlatformSchema.virtual("url").get(function () {
  return "/platform/" + this._id;
});

//Export model
module.exports = mongoose.model("Platform", PlatformSchema);
