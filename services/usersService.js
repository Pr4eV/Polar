const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

const add = async (params) => {
  const { error } = validate(params);
  if (error)
    return {
      success: false,
      code: 400,
      data: error.details[0].message,
    };

  let user = await User.findOne({
    $or: [{ number: params.number }],
  });
  if (user)
    return {
      success: false,
      code: 400,
      data: "A user has registered with this phone number.",
    };

  try {
    user = new User({
      name: params.name,
      number: params.number,
      password: params.password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();

    return {
      success: true,
      code: 200,
      data: user,
      token: token,
    };
  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      code: 500,
      data: "Creating User Failed",
    };
  }
};

const getAll = async () => {
  let users;

  try {
    users = await User.find({})
      .select("-__v -password")
      .sort({ createdAt: -1 });

    if (!users) {
      return {
        success: false,
        code: 404,
        data: "Could not find a users",
      };
    }

    return {
      success: true,
      code: 200,
      data: users,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      code: 500,
      data: "Could not find a users",
    };
  }
};

const update = async (userId, params) => {
  let user;

  try {
    user = await User.findByIdAndUpdate(
      userId,
      {
        name: params.name,
        number: params.number,
      },
      {
        new: true,
      }
    ).select("-__v -createdAt -updatedAt");

    if (!user) {
      return {
        success: false,
        code: 404,
        data: "Could not find a user",
      };
    }

    return {
      success: true,
      code: 200,
      data: user,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      code: 500,
      data: "Could not update user",
    };
  }
};

const deleteById = async (userId) => {
  let user;

  try {
    user = await User.findByIdAndDelete(userId);

    if (!user) {
      return {
        success: false,
        code: 404,
        data: "Could not find a user",
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
      data: "Could not find a user",
    };
  }
};

module.exports = {
  add,
  getAll,
  update,
  deleteById,
};
