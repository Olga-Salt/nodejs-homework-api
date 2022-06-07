const express = require("express");
const router = express.Router();

const { validationMiddleWare, ctrlWrapper } = require("../../middlewares/");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");
const { contacts } = require("../../controllers");

router.get("/", ctrlWrapper(contacts.getAll));

router.get("/:contactId", ctrlWrapper(contacts.getById));

router.post("/", validationMiddleWare(joiSchema), ctrlWrapper(contacts.add));
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
