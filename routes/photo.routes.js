// Require NPM packages
const express = require("express");

// Require Populate
const populate = require("mongoose");

// Configure an Express Router
const router = express.Router();

// Require the photo model
const Photo = require("../models/Photo.model");

/* Routes */

//GET All photos
router.get("/photos", (req, res) => {
    Photo.find()
    .then((allPhotos) => {
      res.status(200).json(allPhotos);
    })
    .catch((error) => {
      next(error)
    });
});

//GET photo Id
router.get("/photos/:photoId", (req, res) => {

    Photo.findById(req.params.photoId)
      .populate("camera")
      .then((photoIdFind) => {
        res.status(200).json(photoIdFind)
      })
      .catch((error) => {
        next(error)
      })
  });

  // POST new photo
  router.post("/photo", (req, res) => {
    const {image, title, year, photographer, description, category} = re.body;
    Photo.create({
      image,
      title,
      year,
      photographer,
      description,
      category,
      camera: []
    })
      .then((createdPhoto) => {
        res.status(200).json(createdPhoto);
      })
      .catch((error) => {
        next(error)
      });
  });

module.exports = router;