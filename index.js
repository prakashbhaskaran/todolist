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
    <span>${todo}</span>
    <i class="far fa-trash-alt delete"></i>
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

const storage = JSON.parse(localStorage.getItem("todo"));
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
  if (e.target.classList.contains("delete")) {
    if (storage.length) {
      RemoveDataFromLocalStorage(
        e.target.parentElement.firstElementChild.innerHTML
      );
    }
    e.target.parentElement.remove();
  }
});
