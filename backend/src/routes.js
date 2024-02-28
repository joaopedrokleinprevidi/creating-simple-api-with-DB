const express = require("express");
const usersController = require("./controllers/usersController");
const usersMiddlewares = require("./middlewares/usersMiddlewares");

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Persistência, resiliência e foco.");
});

router.get("/usuarios", usersController.getAllUsers);
router.get("/usuarios/:id", usersController.getUserById);

router.post(
  "/usuarios",
  usersMiddlewares.validateLogin,
  usersMiddlewares.validatePassword,
  usersController.newUser
);

router.delete("/usuarios/:id", usersController.deleteUser);
router.delete("/usuarios", usersController.deleteAllUsers);

router.put(
  "/usuarios/:id",
  usersMiddlewares.validateLogin,
  usersMiddlewares.validatePassword,
  usersController.updateUser
);

router.put(
  "/usuarios",
  usersMiddlewares.validateLogin,
  usersMiddlewares.validatePassword,
  usersController.updateAllUsers
);

module.exports = router;
