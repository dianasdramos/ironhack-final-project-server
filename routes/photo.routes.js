// Require NPM packages
const express = require("express");

// Require Populate
/* const populate = require("mongoose"); */

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
      next(error);
    });
});

//GET photo Id
router.get("/photos/:photoId", async (req, res, next) => {
  try {
    const { photoId } = req.params;
    const photos = await Photo.findById(photoId).populate("camera");
    res.status(200).json(photos);
  } catch (error) {
    next(error);
  }
});

// POST new photo
router.post("/photo", (req, res) => {
  const { image, title, year, photographer, description, category, camera } =
    req.body;

  Photo.create({
    image,
    title,
    year,
    photographer,
    description,
    category,
    camera,
  })
    .then((newPhoto) => res.json(newPhoto))
    .catch((error) => res.json(error));
});

//PUT photo

/* router.put("/photos/:photosId", (req, res) => {
  // Object destructuring
  const { photoId } = req.params;
  const { image, title, year, photographer, description, category, camera } =
    req.body;

  Photo.findByIdAndUpdate(
    photoId,
    { image, title, year, photographer, description, category, camera },
    { new: true }
  )
    .then((updatedPhoto) => {
      res.status(200).json(updatedPhoto);
    })
    .catch((error) => {
      next(error);
    });
}); */

router.put("/photos/:photosId", async (req, res, next) => {
  Photo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedPhoto) => {
      res.status(200).json(updatedPhoto);
    })
    .catch((error) => {
      next(error);
    });
});
module.exports = router;
