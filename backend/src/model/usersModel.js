const connection = require("./connection");

const getAllUsers = async () => {
  const users = await connection.execute("SELECT * FROM usuarios");
  return users[0];
};

const getUserById = async (id) => {
  const query = "SELECT * FROM usuarios WHERE id = ?";
  const user = await connection.execute(query, [id]);
  return user[0];
};

const newUser = async (user) => {
  const { login, senha } = user;

  const query = "INSERT INTO usuarios(login, senha) VALUES (?, ?)";

  const [newUser] = await connection.execute(query, [login, senha]);
  return newUser;
};
/* */
const deleteUser = async (id) => {
  const query = "DELETE FROM usuarios WHERE id = ?";
  const deletedUser = connection.execute(query, [id]);
  return deletedUser;
};

const deleteAllUsers = async (id) => {
  const query = "DELETE FROM usuarios";
  const deletedAllUsers = await connection.execute(query);
  return deletedAllUsers;
};

const updateUser = async (id, user) => {
  const { login, senha } = user;
  const query = "UPDATE usuarios SET login = ?, senha = ? WHERE id = ?";
  const updatedUser = await connection.execute(query, [login, senha, id]);
  return updatedUser;
};

const updateAllUsers = async (user) => {
  const { login, senha } = user;
  const query = "UPDATE usuarios SET login = ?, senha = ?";
  const updatedAllUsers = await connection.execute(query, [login, senha]);
  return updatedAllUsers;
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
