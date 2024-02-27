const app = require("./app");
require("dotenv").config();

const server = process.env.SERVER_PORT || 3333;

//Rodando servidor na porta 3333
app.listen(server, () => {
  try {
    console.log(`Rodando com sucesso na porta: http://localhost:${server}`);
  } catch {
    console.log("server failed");
  }
});
