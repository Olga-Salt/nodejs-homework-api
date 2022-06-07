// const Joi = require("joi");

// module.exports = {
//   addPostPutValidation: (req, res, next) => {
//     const schema = Joi.object({
//       name: Joi.string().alphanum().min(3).max(30).required(),
//       email: Joi.string().email().required(),
//       phone: Joi.number().required(),
//     });

//     const { error } = schema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ message: "missing required name field" });
//     }

//     next();
//   },
// };

const validationMiddleWare = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing required name field" });
    }

    next();
  };
};

module.exports = validationMiddleWare;
