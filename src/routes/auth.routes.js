const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const loginLimiter = require("../middlewares/rateLimit.middleware");

router.post("/register", authController.register);
router.post("/login", loginLimiter, authController.login);
router.post("/refresh", authController.refresh);
module.exports = router;