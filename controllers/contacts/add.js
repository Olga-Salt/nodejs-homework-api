const { Contact } = require("../../models/");

const add = async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await Contact.create({ name, email, phone });
  res.status(201).json(newContact);
};

module.exports = add;
