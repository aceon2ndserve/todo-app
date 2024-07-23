const API_URL = "https://todo-app-4dqx.onrender.com";
const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

let allTodos = []; // Initialize as an empty array

document.addEventListener("DOMContentLoaded", async () => {
  try {
    allTodos = await loadTodos(); // Await the promise to get the actual data
    updateTodoList(); // Now update the UI
  } catch (error) {
    console.error("Error initializing todos:", error);
  }
});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

async function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText.length === 0) return;
  try {
    const response = await fetch(`${API_URL}:3000/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: todoText }),
    });
    const newTodo = await response.json();
    allTodos.push(newTodo);
    updateTodoList();
    todoInput.value = "";
  } catch (error) {
    console.error("Error adding todo:", error);
  }
}

function updateTodoList() {
  if (!Array.isArray(allTodos)) {
    console.error("Expected allTodos to be an array but got:", allTodos);
    return;
  }

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
    <label for="todo-${index}" class="todo-text">${todoText}</label>
    <button class="delete-button">
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=var(--secondary-color)><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
    </button>
  `;

  const deleteButton = todoLI.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodo(index);
  });

  const checkbox = todoLI.querySelector("input");
  checkbox.addEventListener("change", async () => {
    const updatedTodo = { ...allTodos[index], completed: checkbox.checked };
    try {
      const response = await fetch(
        `${API_URL}:3000/todos/${allTodos[index].id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: checkbox.checked }),
        }
      );
      allTodos[index] = await response.json();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  });
  checkbox.checked = todo.completed;
  return todoLI;
}

async function loadTodos() {
  try {
    const response = await fetch(`${API_URL}:3000/todos`);
    const todos = await response.json();
    console.log("Loaded todos:", todos); // Debug output
    return todos;
  } catch (error) {
    console.error("Error loading todos:", error);
    return []; // Default to empty array on error
  }
}

async function deleteTodo(index) {
  const todo = allTodos[index];
  try {
    await fetch(`${API_URL}:3000/todos/${todo.id}`, {
      method: "DELETE",
    });
    allTodos = allTodos.filter((_, i) => i !== index);
    updateTodoList();
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}
