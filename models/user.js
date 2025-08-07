const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    number: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 64,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    process.env.jwtPrivateKey
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const iranianMobileNumberRegex = /^09\d{9}$/;

  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    number: Joi.string().pattern(iranianMobileNumberRegex).required(),
    password: Joi.string().min(5).max(56).required().messages({
      "string.base": `Password should be a type of 'text'`,
      "string.empty": `Password cannot be an empty`,
      "string.min": `Password should have a minimum length of {#limit}`,
      "string.max": `Password should have a maximum length of {#limit}`,
      "any.required": `Password is a required field`,
    }),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
