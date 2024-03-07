// Require NPM packages
const express = require("express");

// Require Populate
const populate = require("mongoose");

// Configure an Express Router
const router = express.Router();

// Require the camera model
const Camera = require("../models/Camera.model");

/* Routes */

//GET All cameras
router.get("/cameras", (req, res) => {
  Camera.find()

    .then((allCameras) => {
      res.status(200).json(allCameras);
    })
    .catch((error) => {
      next(error);
    });
});

//GET camera Id
router.get("/cameras/:cameraId", (req, res) => {
  Camera.findById(req.params.cameraId)

    .then((cameraIdFind) => {
      res.status(200).json(cameraIdFind);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
