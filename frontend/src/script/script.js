const tbody = document.querySelector("tbody");
const loginUser = document.querySelector("#login");
const passwordUser = document.querySelector("#senha");
const buttonRegisterUser = document.querySelector("#registerUser");

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
  });

  loadAllUsers();
  loginUser.value = "";
  passwordUser.value = "";
};

const updateUser = async (user) => {
  const { id, login, senha } = user;

  await fetch(`${endpoint}/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(login, senha),
  });

  loadAllUsers();
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

  editButton.classList.add("btn-action");
  deleteButton.classList.add("btn-action");

  const sectionForms = createElement("section");
  const editFormLogin = createElement("form");
  const editFormPassword = createElement("form");

  const editInputLogin = createElement("input");
  const editInputPassword = createElement("input");

  const checkButtonOptions = createElement("button");

  editInputLogin.value = login;
  editInputPassword.value = senha;

  sectionForms.append(editFormLogin, editFormPassword);
  editFormLogin.append(editInputLogin);
  editFormPassword.append(editInputPassword);

  sectionForms.addEventListener("submit", (event) => {
    event.preventDefault();

    updateUser({ id, login: loginUser.value, senha: passwordUser.value });
  });

  editButton.addEventListener("click", () => {
    tdLogin.innerText = "";
    tdSenha.innerText = "";
    tdLogin.append(editFormLogin);
    tdSenha.append(editFormPassword);
    tdOptions.append(checkButtonOptions);
  });

  tdOptions.append(editButton, deleteButton);
  tr.append(tdID, tdLogin, tdSenha, tdOptions);

  return tr;
};

const loadAllUsers = async () => {
  const users = await fetchUsers();

  tbody.innerHTML = "";

  users.forEach((user) => {
    const tr = createRow(user);
    tbody.append(tr);
  });
};

buttonRegisterUser.addEventListener("click", newUser);

loadAllUsers();
