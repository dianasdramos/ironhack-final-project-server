const { Schema, model } = require("mongoose");

const cameraSchema = new Schema({
  image: {
    type: String,
    default: "",
    required: [true, "Camera photo url is required"],
  },
  name: {
    type: String,
    default: "",
    required: [true, "Camera name is required."],
  },
  year: {
    type: Number,
    default: 1960,
    required: [true, "Camera year is required."],
  },
  description: {
    type: String,
    default: "",
    required: [true, "Camera description is required"],
  },
});

const Camera = model("Camera", cameraSchema);

module.exports = Camera;
