// src/components/TodoList.js

import React, { useState } from "react";
import TodoForm from "../TodoForm";
import { deleteTodoById } from "../../api/todoApi";
const TodoList = ({ todos, onTodoUpdate }) => {
  const [editingTodoId, setEditingTodoId] = useState("");
  const handleDeleteTodo = async (id) => {
    try {
      console.log("deleting todo id:", id); // Add this line
      await deleteTodoById(id);
      onTodoUpdate();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-list__item">
          {editingTodoId === todo.id ? (
            <div>
              {/* Render TodoForm directly in the list item */}
              <TodoForm date={todo.date} todo={todo} />
            </div>
          ) : (
            <>
              <h3 className="todo-list__title">{todo.title}</h3>
              <p className="todo-list__description">{todo.description}</p>
              <div className="todo-list__actions">
                <button
                  className="todo-list__button todo-list__button--edit"
                  onClick={() => setEditingTodoId(todo.id)}
                >
                  Edit
                </button>
                <button
                  className="todo-list__button todo-list__button--delete"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
