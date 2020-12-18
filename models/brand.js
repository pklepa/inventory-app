const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
});

// Virtual for brand's URL
BrandSchema.virtual("url").get(function () {
  return "/brand/" + this._id;
});

//Export model
module.exports = mongoose.model("Brand", BrandSchema);
