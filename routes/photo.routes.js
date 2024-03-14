// Require NPM packages
const express = require("express");

// Configure an Express Router
const router = express.Router();

// Require the photo model
const Photo = require("../models/Photo.model");

const { isAuthenticated } = require("../middleware/jwt.middleware");

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


//GET photo by User Id
router.get("/photos/user/:userId", isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userPhotos = await Photo.find({ user: userId }).populate("camera");
    
    res.status(200).json(userPhotos);
  } catch (error) {
    next(error);
  }
});

// POST new photo
router.post("/photo",isAuthenticated, (req, res) => {
  const { image, title, year, photographer, description, category, camera, user } =
    req.body;

  Photo.create({
    image,
    title,
    year,
    photographer,
    description,
    category,
    camera,
    user
  })
    .then((newPhoto) => res.json(newPhoto))
    .catch((error) => res.json(error));
});

//PUT photo
router.put("/photos/:photoId", isAuthenticated, async (req, res, next) => {
  Photo.findByIdAndUpdate(req.params.photoId, req.body, { new: true })
    .then((updatedPhoto) => {
      res.status(200).json(updatedPhoto);
    })
    .catch((error) => {
      next(error);
    });
});
module.exports = router;

// Delete photo
router.delete("/photos/:photoId", isAuthenticated, (req, res) => {

  Photo.findByIdAndDelete(req.params.photoId)
    .then(() => {
      res.json({ message: "Photo deleted" });
    })
    .catch(() => {
      res.json({ error: "Failed to delete a photo" });
    });
});