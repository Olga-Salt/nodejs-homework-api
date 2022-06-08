const { Contact } = require("../../models/");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await Contact.findByIdAndDelete(contactId);

  if (!removedContact) {
    res.status(404).json({ message: "Not Found" });
  } else {
    res.status(200).json({ message: "contact deleted" });
  }
};

module.exports = removeById;
