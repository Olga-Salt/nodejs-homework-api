const validationMiddleWare = require("./validationMiddleWare");
const ctrlWrapper = require("./ctrlWrapper");
const authMiddleWare = require("./authMiddleWare");
const uploadMiddleWare = require("./upload");

module.exports = {
  validationMiddleWare,
  ctrlWrapper,
  authMiddleWare,
  uploadMiddleWare,
};
