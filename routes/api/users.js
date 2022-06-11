const express = require("express");

const { ctrlWrapper, authMiddleWare } = require("../../middlewares");
const { users } = require("../../controllers");

const router = express.Router();

router.get("/current", authMiddleWare, ctrlWrapper(users.getCurrent));

module.exports = router;
