const { Contact } = require("../../models/");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    {
      name,
      email,
      phone,
    },
    { new: true }
  );

  if (!updatedContact) {
    res.status(404).json({ message: "Not Found" });
  } else {
    res.json(updatedContact);
  }
};

module.exports = updateById;
