const Joi = require("joi");
const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    hr: {
      type: Number,
      default: 0,
    },
    ppi: {
      type: Number,
      default: 0,
    },
    acc: {
      type: Number,
      default: 0,
    },
    ppg: {
      type: Number,
      default: 0,
    },
    mag: {
      type: Number,
      default: 0,
    },
    gyr: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      trim: true,
      required: true,
    },
    mode: {
      type: String,
      enum: ["online", "offline", "heart", "swim"],
      default: "online",
    },
  },
  { timestamps: true }
);

const Record = mongoose.model("Record", recordSchema);

function validateRecord(record) {
  const schema = Joi.object({
    hr: Joi.number().allow("", null),
    ppi: Joi.number().allow("", null),
    acc: Joi.number().allow("", null),
    ppg: Joi.number().allow("", null),
    mag: Joi.number().allow("", null),
    gyr: Joi.number().allow("", null),
    userId: Joi.string().required(),
    mode: Joi.string().default("online"),
  });

  return schema.validate(record);
}

exports.Record = Record;
exports.validate = validateRecord;
