// src/components/TodoList/index.js
import React from "react";

const TodoList = ({ todos, onDeleteTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span>title : {todo.title}</span>
          <br></br>
          <span>description : {todo.description}</span>
          <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
