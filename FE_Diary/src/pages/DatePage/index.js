import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  createTodo,
  getTodosByDate,
  deleteTodosByDate,
} from "../../api/todoApi";
import TodoList from "../../components/TodoList";
import TodoForm from "../../components/TodoForm";
import { formatDate } from "../../utils/dateUtils"; // 날짜 포맷 유틸리티 가져오기

const DatePage = () => {
  const { date } = useParams();
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const formattedDate = formatDate(date); // 날짜 포맷 적용
        const fetchedTodos = await getTodosByDate(formattedDate);
        setTodos(fetchedTodos);
      } catch (error) {
        setError("Failed to fetch todos.");
      }
    };
    fetchTodos();
  }, [date]);

  const handleAddTodo = async (todoData) => {
    try {
      const formattedDate = formatDate(date); // 날짜 포맷 적용
      await createTodo(formattedDate, todoData);
      const updatedTodos = await getTodosByDate(formattedDate);
      setTodos(updatedTodos);
    } catch (error) {
      setError("Failed to add todo.");
    }
  };

  const handleDeleteTodos = async () => {
    try {
      const formattedDate = formatDate(date); // 날짜 포맷 적용
      await deleteTodosByDate(formattedDate);
      setTodos([]);
    } catch (error) {
      setError("Failed to delete todos.");
    }
  };

  return (
    <div className="date-page">
      <h1>Date: {date}</h1>
      {error && <p>{error}</p>}
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} />
      <button onClick={handleDeleteTodos}>Delete All Todos</button>
    </div>
  );
};

export default DatePage;
