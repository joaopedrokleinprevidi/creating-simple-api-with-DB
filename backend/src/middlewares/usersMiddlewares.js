const validateLogin = (request, response, next) => {
  const { body } = request;

  if (body.login === undefined) {
    return response
      .status(400)
      .json({ errorMessage: 'O campo "login" deve conter algum conteúdo. ' });
  }

  if (body.login === "") {
    return response
      .status(400)
      .json({ errorMessage: 'O campo "login" não pode ser vazio. ' });
  }

  if (body.login.length >= 15) {
    return response.status(400).json({
      errorMessage: 'O campo "login" deve ter menos de 15 caracteres.',
    });
  }

  if (body.login.length <= 3) {
    return response.status(400).json({
      errorMessage: 'O campo "login" deve ter no mínimo 4 caracteres. ',
    });
  }

  if (body.login.includes(" ")) {
    return response
      .status(400)
      .json({ errorMessage: 'O campo "login" não pode ter espaçamentos.' });
  }

  next();
};

const validatePassword = (request, response, next) => {
  const { body } = request;

  if (body.senha == undefined) {
    return response
      .status(400)
      .json({ errorMessage: 'O campo "senha" deve conter algum conteúdo. ' });
  }

  if (body.senha == "") {
    return response
      .status(400)
      .json({ errorMessage: 'O campo "senha" não pode ser vazio. ' });
  }

  if (body.senha.includes(" ")) {
    return response
      .status(400)
      .json({ errorMessage: 'O campo "senha" não pode conter espaçamentos. ' });
  }

  if (body.senha.length >= 15) {
    return response.status(400).json({
      errorMessage: 'O campo "senha" deve ter menos de 15 caracteres.',
    });
  }

  if (!/\d.*\d|\d.*\d/.test(body.senha)) {
    return response.status(400).json({
      errorMessage: 'O campo "senha" deve conter pelo menos dois números. ',
    });
  }

  if (body.senha.length <= 3) {
    return response.status(400).json({
      errorMessage: 'O campo "senha" deve ter no mínimo 4 caracteres.',
    });
  }

  next();
};

module.exports = {
  validateLogin,
  validatePassword,
};
