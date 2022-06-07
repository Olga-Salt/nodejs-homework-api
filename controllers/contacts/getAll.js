const { Contact } = require("../../models/");

const getAll = async (req, res) => {
  const all = await Contact.find({});
  res.json(all);
};

module.exports = getAll;
