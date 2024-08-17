// src/pages/TodoPage/index.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  createTodo,
  getTodosByDate,
  deleteTodoById,
  deleteTodosByDate,
} from "../../api/todoApi";
import TodoList from "../../components/TodoList";
import TodoForm from "../../components/TodoForm";

const TodoPage = () => {
  const { date } = useParams();
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodosByDate(date);
        setTodos(fetchedTodos);
      } catch (error) {
        setError("Failed to fetch todos.");
      }
    };
    fetchTodos();
  }, [date]);

  const handleAddTodo = async (todoData) => {
    try {
      await createTodo(date, todoData);
      const updatedTodos = await getTodosByDate(date);
      setTodos(updatedTodos);
      setSuccessMessage("Todo added successfully!");
    } catch (error) {
      setError("Failed to add todo.");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodoById(id);
      const updatedTodos = await getTodosByDate(date);
      setTodos(updatedTodos);
      setSuccessMessage("Todo deleted successfully!");
    } catch (error) {
      setError("Failed to delete todo.");
    }
  };

  const handleDeleteTodos = async () => {
    try {
      await deleteTodosByDate(date);
      setTodos([]);
      setSuccessMessage("All todos deleted successfully!");
    } catch (error) {
      setError("Failed to delete todos.");
    }
  };

  return (
    <div className="todo-page">
      <h1>Date: {date}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} />
      <button onClick={handleDeleteTodos}>Delete All Todos</button>
    </div>
  );
};

export default TodoPage;
