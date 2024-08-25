// src/components/TodoForm.js

import React, { useState, useEffect } from "react";
import { updateTodo, createTodo } from "../../api/todoApi";
const TodoForm = ({ date, todo, onTodoUpdate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [todo]);

  const handleSubmit = async () => {
    const todoData = { title, description };
    if (todo) {
      console.log("Updating todo:", todo.id, todoData); // Add this line
      await updateTodo(todo.id, todoData);
    } else {
      console.log("Adding new todo:", todoData); // Add this line
      await createTodo(date, todoData);
    }
    setTitle(""); // Clear the form fields
    setDescription("");
    onTodoUpdate();
  };

  return (
    <form className="todo-form">
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="todo-form__button"
        onClick={handleSubmit}
      >
        {todo ? "Update Todo" : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
