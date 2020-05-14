const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "In New York",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.74,
      lng: -73.98,
    },
    creator: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  // order matters
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!place) {
    const error = new Error("Could not find a place for the provided id.");
    error.code = 404;
    throw error; // can use throw if not async code
  }
  res.json({ place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => p.creator === userId);
  if (!place) {
    const error = new Error("Could not find a place for the provided user id.");
    error.code = 404;
    return next(error); // need to use next(error) with async code
  }
  res.json({ place });
});

module.exports = router;
