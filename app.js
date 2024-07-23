const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

let allTodos = loadTodos();
updateTodoList();
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText.length === 0) return;
  const todoObject = {
    text: todoText,
    completed: false,
  };
  allTodos.push(todoObject);
  updateTodoList();
  saveTodos();
  todoInput.value = "";
}
function updateTodoList() {
  todoListUL.innerHTML = "";
  allTodos.forEach((todo, index) => {
    const todoItem = createTodoItem(todo, index);
    todoListUL.append(todoItem);
  });
}
function createTodoItem(todo, index) {
  const todoLI = document.createElement("li");
  const todoText = todo.text;
  todoLI.className = "todo";

  todoLI.innerHTML = `
            <input type="checkbox" id="todo-${index}">
            <label for="todo-${index}" class="custom-checkbox">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="transparent"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
            </label>
            <label for="todo-${index}" class="todo-text">
${todoText}            </label>
            <button class="delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=var(--secondary-color)><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>

  `;
  const deleteButton = todoLI.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodo(index);
  });
  const checkbox = todoLI.querySelector("input");
  checkbox.addEventListener("change", () => {
    allTodos[index].completed = checkbox.checked;
    saveTodos();
  });
  checkbox.checked = todo.completed;
  return todoLI;
}

function saveTodos() {
  const todosJSON = JSON.stringify(allTodos);
  localStorage.setItem("todos", todosJSON);
}

function loadTodos() {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}
function deleteTodo(index) {
  allTodos = allTodos.filter((_, i) => i !== index);
  saveTodos();
  updateTodoList();
}
