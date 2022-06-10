const express = require("express");
const router = express.Router();

const {
  validationMiddleWare,
  ctrlWrapper,
  authMiddleWare,
} = require("../../middlewares/");
const { registerJoiSchema, loginJoiSchema } = require("../../models/user");
const { auth } = require("../../controllers");

router.post(
  "/register",
  validationMiddleWare(registerJoiSchema),
  ctrlWrapper(auth.register)
);

router.post(
  "/login",
  validationMiddleWare(loginJoiSchema),
  ctrlWrapper(auth.login)
);

router.get("/logout", authMiddleWare, ctrlWrapper(auth.logout));
module.exports = router;
