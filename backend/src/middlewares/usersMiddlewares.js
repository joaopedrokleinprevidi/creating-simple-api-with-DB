const validateLogin = (request, response, next) => {
  const { body } = request;

  let errorMessage = "";

  if (body.login === undefined) {
    errorMessage = 'O campo "login" deve conter algum conteúdo. ';
  }

  if (body.login === "") {
    errorMessage = 'O campo "login" não pode ser vazio. ';
  }

  if (body.login.length >= 15) {
    errorMessage = 'O campo "login" deve ter menos de 15 caracteres.';
  }

  if (body.login.length <= 3) {
    errorMessage = 'O campo "login" deve ter no mínimo 4 caracteres. ';
  }

  if (body.login.includes(" ")) {
    errorMessage = 'O campo "login" não pode ter espaçamentos.';
  }

  if (!errorMessage == "") {
    return response.status(400).json({ errorMessage });
  }

  next();
};

const validatePassword = (request, response, next) => {
  const { body } = request;

  let errorMessage = "";

  if (body.senha == undefined) {
    errorMessage = 'O campo "senha" deve conter algum conteúdo. ';
  }

  if (body.senha == "") {
    errorMessage = 'O campo "senha" não pode ser vazio. ';
  }

  if (body.senha.includes(" ")) {
    errorMessage = 'O campo "senha" não pode conter espaçamentos. ';
  }

  if (body.senha.length >= 15) {
    errorMessage = 'O campo "senha" deve ter menos de 15 caracteres.';
  }

  if (!/\d.*\d|\d.*\d/.test(body.senha)) {
    errorMessage = 'O campo "senha" deve conter pelo menos dois números. ';
  }

  if (body.senha.length <= 3) {
    errorMessage = 'O campo "senha" deve ter no mínimo 4 caracteres.';
  }

  if (!errorMessage == "") {
    return response.status(400).json({ errorMessage });
  }

  next();
};

module.exports = {
  validateLogin,
  validatePassword,
};
