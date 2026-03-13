const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

router.get("/me", auth, userController.me);

module.exports = router;