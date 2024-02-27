const express = require("express");
const usersController = require("./controllers/usersController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Persistência, resiliência e foco.");
});

router.get("/usuarios", usersController.getAllUsers);

router.post("/usuarios", usersController.newUser);

router.delete("/usuarios/:id", usersController.deleteUser);

module.exports = router;
