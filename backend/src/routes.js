const express = require("express");
const usersController = require("./controllers/usersController");

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Persistência, resiliência e foco.");
});

router.get("/usuarios", usersController.getAllUsers);
router.get("/usuarios/:id", usersController.getUserById);

router.post("/usuarios", usersController.newUser);

router.delete("/usuarios/:id", usersController.deleteUser);
router.delete("/usuarios", usersController.deleteAllUsers);

router.put("/usuarios/:id", usersController.updateUser);
router.put("/usuarios", usersController.updateAllUsers);

module.exports = router;
