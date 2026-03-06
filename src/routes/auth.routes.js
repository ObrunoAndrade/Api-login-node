const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.controller");
const loginLimiter = require("../../middlewares/rateLimit.middleware");

router.post("/login", loginLimiter, authController.login);
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;