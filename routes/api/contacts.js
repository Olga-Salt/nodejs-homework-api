const express = require("express");
const router = express.Router();

const {
  validationMiddleWare,
  ctrlWrapper,
  authMiddleWare,
} = require("../../middlewares/");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");
const { contacts } = require("../../controllers");

router.get("/", authMiddleWare, ctrlWrapper(contacts.getAll));

router.get("/:contactId", ctrlWrapper(contacts.getById));

router.post(
  "/",
  authMiddleWare,
  validationMiddleWare(joiSchema),
  ctrlWrapper(contacts.add)
);
router.delete("/:contactId", ctrlWrapper(contacts.removeById));

router.put(
  "/:contactId",
  validationMiddleWare(joiSchema),
  ctrlWrapper(contacts.updateById)
);

router.patch(
  "/:contactId/favorite",
  validationMiddleWare(favoriteJoiSchema),
  ctrlWrapper(contacts.updateStatus)
);

module.exports = router;
