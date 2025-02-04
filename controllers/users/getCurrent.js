const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  res.json({
    status: 200,
    code: 200,
    data: {
      user: {
        name,
        email,
      },
    },
  });
};

module.exports = getCurrent;
