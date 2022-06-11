const { Contact } = require("../../models/");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite = false } = req.query;
  const skip = (page - 1) * limit;
  const all = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");

  if (favorite) {
    const favor = await Contact.find({ owner: _id, favorite: favorite });
    res.json(favor);
  }
  res.json(all);
};

module.exports = getAll;
