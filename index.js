const addForm = document.querySelector(".add");
const todoList = document.querySelector(".todos");

const generateTemplate = (todo) => {
  const html = ` <li
    class="
      list-group-item
      d-flex
      justify-content-between
      align-items-center
      text-light
    "
  >
  <i class="fas fa-edit edit" title="Edit"></i>
  <input
    type="text"
    class="text bg-transparent text-light"
    value=${todo}
    readonly="readonly"
  />
    <i class="far fa-trash-alt delete title="Delete"></i>
  </li>`;

  todoList.innerHTML += html;
};

function SaveDataToLocalStorage(data) {
  let item = [];

  item = JSON.parse(localStorage.getItem("todo")) || [];

  item.push(data);

  localStorage.setItem("todo", JSON.stringify(item));

  generateTemplate(data);
}

function RemoveDataFromLocalStorage(data) {
  let item = JSON.parse(localStorage.getItem("todo"));

  let filteredItem = item.filter((e) => e !== data);

  localStorage.setItem("todo", JSON.stringify(filteredItem));
}

function EditDataInLocalStorage(data, index) {
  let item = JSON.parse(localStorage.getItem("todo"));

  item.splice(index, 1, data);

  localStorage.setItem("todo", JSON.stringify(item));
}

const storage = JSON.parse(localStorage.getItem("todo")) || [];

for (const todo of storage) {
  generateTemplate(todo);
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addForm.add.value.trim();
  SaveDataToLocalStorage(todo);
  addForm.reset();
});

todoList.addEventListener("click", (e) => {
  const input = e.target.parentElement.children[1];

  const index = Array.from(
    e.target.parentElement.parentElement.children
  ).indexOf(e.target.parentElement);

  if (e.target.classList.contains("delete")) {
    if (storage.length) {
      RemoveDataFromLocalStorage(input.value);
    }
    e.target.parentElement.remove();
  }

  if (e.target.classList.contains("edit")) {

    input.removeAttribute("readonly");
    input.focus();
    e.target.parentElement.firstElementChild.className = "fas fa-save save";
    e.target.parentElement.firstElementChild.setAttribute("title", "save");

  } else if (e.target.classList.contains("save")) {

    input.setAttribute("readonly", "readonly");
    input.blur();
    e.target.parentElement.firstElementChild.className = "fas fa-edit edit";
    e.target.parentElement.firstElementChild.setAttribute("title", "edit");
    EditDataInLocalStorage(input.value, index);

  }
});
