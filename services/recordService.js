const { Record, validate } = require("../models/records");

const add = async (params) => {
  const { error } = validate(params);
  if (error)
    return {
      success: false,
      code: 400,
      data: error.details[0].message,
    };

  let record;

  try {
    record = new Record({
      hr: params.hr,
      ppi: params.ppi,
      acc: params.acc,
      ppg: params.ppg,
      mag: params.mag,
      gyr: params.gyr,
      userId: params.userId,
      mode: params.mode,
    });

    await record.save();

    return {
      success: true,
      code: 200,
      data: record,
    };
  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      code: 500,
      data: "Creating Record Failed",
    };
  }
};

const addBulk = async (recordsArray) => {
  try {
    if (!Array.isArray(recordsArray) || recordsArray.length === 0) {
      return {
        success: false,
        code: 400,
        data: "Input must be a non-empty array of records",
      };
    }

    // Optional: Validate each record using your existing `validate` function
    for (const record of recordsArray) {
      const { error } = validate(record);
      if (error) {
        return {
          success: false,
          code: 400,
          data: `Validation failed: ${error.details[0].message}`,
        };
      }
    }

    const savedRecords = await Record.insertMany(recordsArray);

    return {
      success: true,
      code: 200,
      data: savedRecords,
    };
  } catch (error) {
    console.log("error in addBulk:", error);
    return {
      success: false,
      code: 500,
      data: "Batch insert failed",
    };
  }
};

const getAll = async () => {
  let record;

  try {
    record = await Record.find({})
      .select("-__v -password")
      .sort({ createdAt: -1 });

    if (!record) {
      return {
        success: false,
        code: 404,
        data: "Could not find a record",
      };
    }

    return {
      success: true,
      code: 200,
      data: record,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      code: 500,
      data: "Could not find a record",
    };
  }
};

const getByUserId = async (userId) => {
  let record;

  try {
    record = await Record.find({ userId })
      .select("-__v -password")
      .sort({ createdAt: -1 });

    if (!record) {
      return {
        success: false,
        code: 404,
        data: "Could not find a record",
      };
    }

    return {
      success: true,
      code: 200,
      data: record,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      code: 500,
      data: "Could not find a record",
    };
  }
};

const update = async (recordId, params) => {
  let record;

  try {
    record = await Record.findByIdAndUpdate(
      recordId,
      {
        hr: params.hr,
        ppi: params.ppi,
        acc: params.acc,
        ppg: params.ppg,
        mag: params.gyr,
        userId: params.userId,
        mode: params.mode,
      },
      {
        new: true,
      }
    ).select("-__v -createdAt -updatedAt");

    if (!record) {
      return {
        success: false,
        code: 404,
        data: "Could not find a record",
      };
    }

    return {
      success: true,
      code: 200,
      data: record,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      code: 500,
      data: "Could not update record",
    };
  }
};

const deleteById = async (recordId) => {
  let record;

  try {
    record = await User.findByIdAndDelete(recordId);

    if (!record) {
      return {
        success: false,
        code: 404,
        data: "Could not find a record",
      };
    }

    return {
      success: true,
      code: 200,
      data: true,
    };
  } catch (e) {
    console.log(e);

    return {
      success: false,
      code: 500,
      data: "Could not find a record",
    };
  }
};

module.exports = {
  add,
  addBulk,
  getAll,
  getByUserId,
  update,
  deleteById,
};
