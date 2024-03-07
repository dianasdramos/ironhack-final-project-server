const { Schema, model } = require("mongoose");

const photoSchema = new Schema({
  image: {
    type: String,
    default: "",
    required: [true, "Photo url is required"],
  },
  title: {
    type: String,
    default: "",
    required: [true, "Photo title is required."],
  },
  year: {
    type: Number,
    default: 1960,
    required: [true, "Photo year is required."],
  },
  photographer: {
    type: String,
    default: "",
    required: [true, "Photographer name is required."],
  },
  description: {
    type: String,
    default: "",
    required: [true, "Photo description is required"],
  },
  category: { type: [String], enum: ["", "", "", "", "", ""] },

  camera: {
    name: { type: mongoose.Schema.Types.ObjectId, ref: "Camera", default: ""},
  },
});

const Photo = model("Photo", photoSchema);

module.exports = Photo;