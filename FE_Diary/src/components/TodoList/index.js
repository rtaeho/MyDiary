// src/components/TodoList.js

import React from "react";

const TodoList = ({ todos, onDeleteTodo, onEditTodo, onUpdateTodo }) => {
  const handleEditClick = (todo) => {
    onEditTodo(todo);
  };

  const handleDeleteClick = (id) => {
    onDeleteTodo(id);
  };

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-list__item">
          <h3 className="todo-list__title">{todo.title}</h3>
          <p className="todo-list__description">{todo.description}</p>
          <button
            className="todo-list__button todo-list__button--edit"
            onClick={() => handleEditClick(todo)}
          >
            Edit
          </button>
          <button
            className="todo-list__button todo-list__button--delete"
            onClick={() => handleDeleteClick(todo.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
