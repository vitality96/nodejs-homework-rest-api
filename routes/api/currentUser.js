const express = require("express");

const {auth } = require("../../middlewares");
const {currentUser: ctrl} = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrl.getCurrent);


module.exports = router;