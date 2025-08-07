const recordsService = require("../services/recordService");

const add = async (req, res) => {
  const params = req.body;
  const response = await recordsService.add(params);

  res.status(response.code).send(response.data);
};

const addBulk = async (req, res) => {
  const params = req.body.records;
  const response = await recordsService.addBulk(params);

  res.status(response.code).send(response.data);
};

const getAll = async (req, res) => {
  const response = await recordsService.getAll();

  res.status(response.code).send(response.data);
};

const getByUserId = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const response = await recordsService.getByUserId(userId);

  res.status(response.code).send(response.data);
};

const update = async (req, res) => {
  const { recordId } = req.params;
  const params = req.body;

  const response = await recordsService.update(recordId, params);

  res.status(response.code).send(response.data);
};

const deleteById = async (req, res) => {
  const { recordId } = req.params;

  const response = await recordsService.deleteById(recordId);

  res.status(response.code).send(response.data);
};

module.exports = {
  add,
  addBulk,
  getAll,
  getByUserId,
  update,
  deleteById,
};
