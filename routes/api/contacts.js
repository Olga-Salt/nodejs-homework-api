const express = require("express");
const router = express.Router();
const {
  addPostPutValidation,
} = require("../../middlewares/validationMiddleWare");

const contacts = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const all = await contacts.listContacts();
    res.json(all);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await contacts.getContactById(contactId);
    if (!contactById) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(contactById);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", addPostPutValidation, async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await contacts.addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(contactId);
    const removedContact = await contacts.removeContact(contactId);
    if (!removedContact) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.status(200).json({ message: "contact deleted" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", addPostPutValidation, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    const updatedContact = await contacts.updateContact(contactId, {
      name,
      email,
      phone,
    });

    if (!updatedContact) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.json(updatedContact);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
