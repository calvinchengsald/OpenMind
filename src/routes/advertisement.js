
const express = require("express");
const router = express.Router();


const advertisementController = require("../controllers/advertisementController");

router.get("/advertisement", advertisementController.index);
router.get("/advertisement/new", advertisementController.new);
router.get("/advertisement/create", advertisementController.create);
router.get("/advertisement/:id", advertisementController.show);

module.exports = router;
