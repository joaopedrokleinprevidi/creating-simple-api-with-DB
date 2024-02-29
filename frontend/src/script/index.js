const tbody = document.querySelector("tbody");
const loginUser = document.querySelector("#login");
const passwordUser = document.querySelector("#senha");
const buttonRegisterUser = document.querySelector("#registerUser");
const errorContainer = document.querySelector("#errorContainer");
const dangerContainer = document.querySelector(".warn");
const buttonDeleteAllUsers = document.querySelector("#deleteAll");
const buttonEditAllUsers = document.querySelector("#editAll");

const endpoint = "http://localhost:3333/usuarios";

const fetchUsers = async () => {
  const response = await fetch(endpoint);

  const users = await response.json();
  console.log(users);
  return users;
};

const newUser = async (event) => {
  event.preventDefault();

  const login = loginUser.value;
  const senha = passwordUser.value;

  const user = { login, senha };
  console.log(user);

  await fetch(endpoint, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then(async (response) => {
      if (response.ok) {
        return;
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.errorMessage || "Erro desconhecido");
      }
    })
    .catch((error) => {
      console.error("Erro ao solicitar a requisição: ", error.message);
      showErrorForUserCausedByMiddlewares(error.message);
    });

  loadAllUsers();
  loginUser.value = "";
  passwordUser.value = "";
};

const updateUser = async ({ id, login, senha }) => {
  await fetch(`${endpoint}/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, senha }),
  })
    .then(async (response) => {
      if (response.ok) {
        return;
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.errorMessage || "Erro desconhecido");
      }
    })
    .catch((error) => {
      console.error("Erro ao realizar a requisição: ", error.message);
      showErrorForUserCausedByMiddlewares(error.message);
    });

  loadAllUsers();
};

const updateAllUsers = async ({ login, senha }) => {
  await fetch(`${endpoint}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, senha }),
  })
    .then(async (response) => {
      if (response.ok) {
        return;
      } else {
        const errorResponse = await response.json();
        console.log(errorResponse);
        throw new Error(errorResponse.errorMessage || "Erro desconhecido");
      }
    })
    .catch((error) => {
      console.error("Erro ao realizar a requisição: ", error.message);
      showErrorForUserCausedByMiddlewares(error.message);
    });

  loadAllUsers();
};

const deleteUser = async (id) => {
  await fetch(`${endpoint}/${id}`, {
    method: "delete",
  });

  loadAllUsers();
};

const deleteAllUsers = async () => {
  await fetch(`${endpoint}`, {
    method: "delete",
  });
  loadAllUsers();
};

function showErrorForUserCausedByMiddlewares(error) {
  const content = errorContainer.innerHTML;
  errorContainer.innerHTML = `${content} <h1>Erro: ${error} </h1>`;

  setTimeout(() => {
    errorContainer.innerHTML = "";
  }, 3500);
}

const loadAllUsers = async () => {
  const users = await fetchUsers();

  tbody.innerHTML = "";

  users.forEach((user) => {
    const tr = createRow(user);
    tbody.append(tr);
  });
};

const createElement = (tag, innerText = "", innerHTML = "") => {
  const element = document.createElement(tag);

  if (innerText) {
    element.innerText = innerText;
  }

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
};

const createRow = (user) => {
  const { id, login, senha } = user;

  const tr = createElement("tr");
  const tdID = createElement("td", id);
  const tdLogin = createElement("td", login);
  const tdSenha = createElement("td", senha);
  const tdOptions = createElement("td");

  const editButton = createElement(
    "button",
    "",
    ' <span class="material-symbols-outlined"> edit </span>'
  );
  const deleteButton = createElement(
    "button",
    "",
    ' <span class="material-symbols-outlined">delete</span>'
  );

  const okButton = createElement(
    "button",
    "",
    '<span class="material-symbols-outlined">check</span>'
  );

  editButton.classList.add("btn-action");
  deleteButton.classList.add("btn-action");
  okButton.classList.add("btn-action");

  const editFormLogin = createElement("form");
  const editFormPassword = createElement("form");

  const editInputLogin = createElement("input");
  const editInputPassword = createElement("input");

  editInputLogin.value = login;
  editInputPassword.value = senha;

  editFormLogin.append(editInputLogin);
  editFormPassword.append(editInputPassword);

  editButton.addEventListener("click", () => {
    tdLogin.innerText = "";
    tdSenha.innerText = "";
    tdLogin.append(editFormLogin);
    tdSenha.append(editFormPassword);
    tdOptions.append(okButton);
  });

  okButton.addEventListener("click", (event) => {
    event.preventDefault();

    updateUser({
      id,
      login: editInputLogin.value,
      senha: editInputPassword.value,
    });
  });

  deleteButton.addEventListener("click", () => {
    deleteUser(id);
  });
  tdOptions.append(editButton, deleteButton);
  tr.append(tdID, tdLogin, tdSenha, tdOptions);

  return tr;
};

buttonRegisterUser.addEventListener("click", newUser);
buttonDeleteAllUsers.addEventListener("click", deleteAllUsers);
buttonEditAllUsers.addEventListener("click", () => {
  const form = createElement("form");
  form.classList.add("formCounter");
  const quantityForm = document.querySelectorAll(".formCounter");

  if (quantityForm.length == 0) {
    const inputLogin = createElement("input");
    const inputPassword = createElement("input");
    const buttonOK = createElement("button", "OK");
    inputLogin.placeholder = "Login";
    inputPassword.placeholder = "Password";
    inputLogin.classList.add("spacing");
    inputPassword.classList.add("spacing");
    form.append(inputLogin, inputPassword, buttonOK);
    dangerContainer.append(form);
    buttonOK.addEventListener("click", () => {
      updateAllUsers({ login: inputLogin.value, senha: inputPassword.value });
    });
  }
});

loadAllUsers();
