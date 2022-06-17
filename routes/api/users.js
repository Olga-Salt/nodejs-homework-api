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
  authMiddleWare,
  ctrlWrapper(users.updateAvatar)
);

module.exports = router;
