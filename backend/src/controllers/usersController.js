const usersModel = require("../model/usersModel");

const getAllUsers = async (_request, response) => {
  const users = await usersModel.getAllUsers();

  return response.status(200).json(users);
};

const getUserById = async (request, response) => {
  const { id } = request.params;
  const user = await usersModel.getUserById(id);
  return response.status(200).json(user);
};

const newUser = async (request, response) => {
  const newUser = await usersModel.newUser(request.body);

  return response.status(201).json(newUser);
};

const deleteUser = async (request, response) => {
  const { id } = request.params;
  await usersModel.deleteUser(id);
  return response
    .status(204)
    .json({ message: "Usuário deletado com sucesso." });
};

const deleteAllUsers = async (_request, response) => {
  await usersModel.deleteAllUsers();
  return response
    .status(200)
    .json({ message: "Todos usuários deletados com sucesso." });
};

const updateUser = async (request, response) => {
  const { id } = request.params;
  await usersModel.updateUser(id, request.body);
  return response
    .status(204)
    .json({ message: "Usuário atualizado com sucesso. " });
};

const updateAllUsers = async (request, response) => {
  await usersModel.updateAllUsers(request.body);
  return response
    .status(204)
    .json({ message: "Todos os usuários foram atualizados com sucesso. " });
};

module.exports = {
  getAllUsers,
  newUser,
  deleteUser,
  getUserById,
  deleteAllUsers,
  updateUser,
  updateAllUsers,
};
