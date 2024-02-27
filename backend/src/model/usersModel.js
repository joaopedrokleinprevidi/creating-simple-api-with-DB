const connection = require("./connection");

const getAllUsers = async () => {
  const users = await connection.execute("SELECT * FROM usuarios");
  console.log("foi");
  return users[0];
};

const newUser = async (user) => {
  const { login, senha } = user;

  const query = "INSERT INTO usuarios(login, senha) VALUES (?, ?)";

  const [newUser] = await connection.execute(query, [login, senha]);
  return newUser;
};

const deleteUser = async (id) => {
  const query = "DELETE FROM usuarios WHERE id = ?";
  const deletedUser = connection.execute(query, [id]);
  return deletedUser;
};

module.exports = {
  getAllUsers,
  newUser,
  deleteUser,
};
