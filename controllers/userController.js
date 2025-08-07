const usersService = require("../services/usersService");

const add = async (req, res) => {
  const params = req.body;
  const response = await usersService.add(params);

  if (response.code !== 200) {
    res.status(response.code).send(response.data);
  } else {
    res.header("x-auth-token", response.token).send({
      id: response.data._id,
      name: response.data.name,
      status: response.data.status,
      role: response.data.role,
      number: response.data.number,
      rate: response.data.rate,
      minutes: response.data.minutes,
      token: response.token,
    });
  }
};

const getAll = async (req, res) => {
  const response = await usersService.getAll();

  res.status(response.code).send(response.data);
};

const update = async (req, res) => {
  const { userId } = req.params;
  const params = req.body;

  const response = await usersService.update(userId, params);

  res.status(response.code).send(response.data);
};

const deleteById = async (req, res) => {
  const { userId } = req.params;

  const response = await usersService.deleteById(userId);

  res.status(response.code).send(response.data);
};

module.exports = {
  add,
  getAll,
  update,
  deleteById,
};
