import React, { useState } from "react";
import TodoForm from "../TodoForm";
import { deleteTodoById, updateTodo } from "../../api/todoApi"; // updateTodo import 추가

const TodoList = ({ todos, onTodoUpdate }) => {
  const [editingTodoId, setEditingTodoId] = useState("");

  const handleDeleteTodo = async (id) => {
    try {
      console.log("deleting todo id:", id);
      await deleteTodoById(id);
      onTodoUpdate();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleToggleComplete = async (todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await updateTodo(todo.id, updatedTodo);
      onTodoUpdate();
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`todo-list__item ${
            todo.completed ? "todo-list__item--completed" : ""
          }`}
        >
          {editingTodoId === todo.id ? (
            <div className="todo-list__form-container">
              {/* Render TodoForm directly in the list item */}
              <TodoForm
                date={todo.date}
                todo={todo}
                onTodoUpdate={onTodoUpdate}
              />
            </div>
          ) : (
            <>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo)}
                className="todo-list__checkbox"
              />
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
