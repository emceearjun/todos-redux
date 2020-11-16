import { Actions, store } from "./store";

const form = document.querySelector(".todo-form");
const todoInput = form.querySelector("#todo");
const todoItemList = document.querySelector(".todo-item-list");

const onTodoToggle = (e) => {
  store.dispatch(Actions.toggleTodo(e.target.dataset.todoId))
};

const onTodoUpdate = () => {
  const todoCheckboxList = document.querySelectorAll(".todo-checkbox");
  todoCheckboxList.forEach((todoCheckbox) => {
    todoCheckbox.addEventListener("change", onTodoToggle);
  });
  console.log(store.getState());
};

const onStoreUpdated = () => {
  const todos = store.getState();
  renderTodos(todos);
  onTodoUpdate();
};

const onSubmit = (e) => {
  e.preventDefault();
  store.dispatch(Actions.addTodo(todoInput.value));
};

const renderTodos = (todos) => {
  let todoListElements = "";
  todoItemList.innerHTML = [];

  const todoList = todos.forEach((todo) => {
    todoListElements += `<li><input data-todo-id=${
      todo.id
    } class="todo-checkbox" type="checkbox" ${
      todo.completed ? "checked" : ""
    } id="todo-${todo.id}"> <label for="todo-${todo.id}">${
      todo.description
    }</label></li>`;
  });
  todoItemList.innerHTML = todoListElements;
};

form.addEventListener("submit", onSubmit);
store.subscribe(onStoreUpdated);
onStoreUpdated();

