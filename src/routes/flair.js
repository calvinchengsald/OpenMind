
const express = require("express");
const router = express.Router();

const flairController = require("../controllers/flairController")

router.get("/flair", flairController.index);
router.get("/flair/new", flairController.new);
router.post("/flair/create", flairController.create);
router.get("/flair/:id", flairController.show);
router.get("/flair/:id/edit", flairController.edit);
router.post("/flair/:id/update", flairController.update);
router.post("/flair/:id/destroy", flairController.destroy);

module.exports = router;
