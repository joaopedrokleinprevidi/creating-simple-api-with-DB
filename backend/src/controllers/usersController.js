const usersModel = require("../model/usersModel");

const getAllUsers = async (_request, response) => {
  const users = await usersModel.getAllUsers();

  return response.status(200).json(users);
};

const newUser = async (request, response) => {
  const newUser = await usersModel.newUser(request.body);

  return response.status(201).json(newUser);
};

const deleteUser = async (request, response) => {
  const { id } = request.params;
  await usersModel.deleteUser(id);
  return response.status(204).json();
};

module.exports = {
  getAllUsers,
  newUser,
  deleteUser,
};
