import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTodo,
  getTodosByDate,
  deleteTodosByDate,
} from "../../api/todoApi";
import TodoList from "../../components/TodoList";
import TodoForm from "../../components/TodoForm";

const DatePage = () => {
  const { date } = useParams();
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

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
    } catch (error) {
      setError("Failed to add todo.");
    }
  };

  const handleDeleteTodos = async () => {
    try {
      await deleteTodosByDate(date);
      setTodos([]);
    } catch (error) {
      setError("Failed to delete todos.");
    }
  };

  const handleWriteDiaryClick = () => {
    navigate(`/diary/${date}`);
  };

  return (
    <div className="date-page">
      <button onClick={handleWriteDiaryClick}>일기쓰기</button>
      <h1>Date: {date}</h1>
      {error && <p>{error}</p>}
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} />
      <button onClick={handleDeleteTodos}>Delete All Todos</button>
    </div>
  );
};

export default DatePage;
