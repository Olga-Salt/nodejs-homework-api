const { Contact } = require("../../models/");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId);

  if (!contactById) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json(contactById);
  }
};

module.exports = getById;
