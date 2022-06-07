// const { NotFound } = require("http-errors");

const { Contact } = require("../../models/");

const updateStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!result) {
    // throw new NotFound(`Contact with id=${contactId} not found`);
    res.status(404).json({ message: "Not Found" });
  }
  res.json(result);
};

module.exports = updateStatus;
