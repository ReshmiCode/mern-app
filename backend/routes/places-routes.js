const express = require("express");
const { check } = require("express-validator");

const placesControllers = require("../controllers/places-controller");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/:pid", placesControllers.getPlaceById);

router.delete("/:pid", placesControllers.deletePlaceById);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesControllers.updatePlaceById
);

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);

module.exports = router;
