import React, { useState } from "react";
import TodoForm from "../TodoForm";
import { deleteTodoById, updateTodo } from "../../api/todoApi";

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
              <div className="todo-list__content">
                <p className="todo-list__title">{todo.title}</p>
                <p className="todo-list__description">{todo.description}</p>
              </div>
              <div className="todo-list__actions">
                <button
                  className="todo-list__button todo-list__button--edit"
                  onClick={() => setEditingTodoId(todo.id)}
                >
                  수정
                </button>
                <button
                  className="todo-list__button todo-list__button--delete"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  삭제
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
