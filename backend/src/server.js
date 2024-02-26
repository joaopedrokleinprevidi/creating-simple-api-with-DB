const express = require("express");
const app = express();

//Rodando servidor na porta 8080
app.listen("8080", (response) => {
  console.log(`Rodando com sucesso na porta: http://localhost:8080`);
});
