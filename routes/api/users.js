const express = require("express");

const {
  ctrlWrapper,
  authMiddleWare,
  uploadMiddleWare,
} = require("../../middlewares");
const { users } = require("../../controllers");

const router = express.Router();

router.get("/current", authMiddleWare, ctrlWrapper(users.getCurrent));

router.patch(
  "/avatars",
  uploadMiddleWare.single("avatar"),
  authMiddleWare
  // ctrlWrapper(users.updateAvatar)
);

router.get("/verify/:verificationToken", ctrlWrapper(users.verifyEmail));
router.post("/verify", ctrlWrapper(users.resendEmail));
module.exports = router;
