const filterData = () => {
  if (tab === "all") return todoList;
  const finishStatus = tab !== "todo";
  return todoList.filter((todo) => todo.isFinish === finishStatus);
};

const renderTodosNum = () => {
  const todosNum = todoList.reduce(
    (num, todo) => (num += todo.isFinish ? 0 : 1),
    0
  );
  document.querySelector(
    ".list_footer p"
  ).textContent = `${todosNum} 個待完成項目`;

  if (todosNum === todoList.length) {
    deleteAllFinishBtn.classList.add("disabled");
  } else {
    deleteAllFinishBtn.classList.remove("disabled");
  }
};

const renderList = () => {
  if (!todoList.length) {
    cardList.classList.add("d-none");
    return;
  } else {
    cardList.classList.remove("d-none");
  }

  const data = filterData();

  let htmlString = "";
  data.forEach((todo) => {
    htmlString += `<li>
            <label class="checkbox" for="">
              <input type="checkbox" data-id="${todo.id}" ${
      todo.isFinish ? "checked" : ""
    } />
              <span>${todo.text}</span>
            </label>
            <a href="#" class="delete" data-id="${todo.id}"></a>
          </li>`;
  });
  list.innerHTML = htmlString;

  renderTodosNum();
};

const addTodo = () => {
  if (todoInput.value) return;
  const id = new Date().getTime().toString();
  todoList.push({
    isFinish: false,
    text: todoInput.value,
    id,
  });
  renderList();
  todoInput.value = "";
  handleAddButtonStyle();
};

const switchTodoStatus = (targetId) => {
  const index = todoList.findIndex((todo) => todo.id === targetId);
  if (index < 0) return;
  todoList[index].isFinish = !todoList[index].isFinish;
  renderList();
};

const deleteTodo = (targetId) => {
  todoList = todoList.filter((todo) => todo.id !== targetId);
  renderList();
};

const handleTab = (event) => {
  tabButtons.forEach((button) => button.classList.remove("active"));
  event.target.classList.add("active");
  tab = event.target.dataset.type;
  renderList();
};

const handleAddButtonStyle = () => {
  if (!todoInput.value) {
    addTodoButton.classList.add("disabled");
  } else {
    addTodoButton.classList.remove("disabled");
  }
};

const handleAddTodo = (event) => {
  event.preventDefault();
  addTodo();
};

const handleAddInputKeyup = (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
};

const handleListStatus = (event) => {
  const { tagName } = event.target;
  const { id } = event.target.dataset;
  if (tagName === "INPUT") {
    switchTodoStatus(id);
  } else if (tagName === "A") {
    deleteTodo(id);
  }
};

const handleDeleteAllFinish = (event) => {
  event.preventDefault();
  todoList = todoList.filter((todo) => !todo.isFinish);
  renderList();
};

const list = document.querySelector(".list");
const todoInput = document.querySelector(".card input");
const addTodoButton = document.querySelector(".btn_add");
const tabButtons = document.querySelectorAll(".tab li");
const deleteAllFinishBtn = document.querySelector(".delete_all");
const cardList = document.querySelector(".card_list");

addTodoButton.addEventListener("click", handleAddTodo);
todoInput.addEventListener("input", handleAddButtonStyle);
todoInput.addEventListener("keyup", handleAddInputKeyup);
list.addEventListener("click", handleListStatus);
deleteAllFinishBtn.addEventListener("click", handleDeleteAllFinish);

tabButtons.forEach((button) => button.addEventListener("click", handleTab));

let tab = "all";
let todoList = [];
renderList();
