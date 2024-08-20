import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  createTodo,
  getTodosByDate,
  deleteTodoById,
  updateTodo,
  deleteTodosByDate,
} from "../../api/todoApi";
import { getDiaryByDate } from "../../api/diaryApi";
import TodoList from "../../components/TodoList";
import TodoForm from "../../components/TodoForm";
import DiaryPage from "../DiaryPage"; // DiaryPage 컴포넌트 import

const DatePage = () => {
  const { date } = useParams();
  const [todos, setTodos] = useState([]);
  const [diary, setDiary] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchTodosAndDiary = async () => {
      try {
        const [fetchedTodos, fetchedDiary] = await Promise.all([
          getTodosByDate(date),
          getDiaryByDate(date),
        ]);
        setTodos(fetchedTodos);
        setDiary(fetchedDiary);
      } catch (error) {
        setError("Failed to fetch todos or diary.");
      }
    };
    fetchTodosAndDiary();
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

  const handleUpdateTodo = async (id, updatedData) => {
    try {
      await updateTodo(id, updatedData);
      const updatedTodos = await getTodosByDate(date);
      setTodos(updatedTodos);
      setSuccessMessage("Todo updated successfully!");
    } catch (error) {
      setError("Failed to update todo.");
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

  const handleDiarySaved = (newDiary) => {
    setDiary(newDiary);
  };

  return (
    <div className="date-page">
      <h1>Date: {date}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      {/* Todo 관련 컴포넌트들 */}
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onDeleteTodo={handleDeleteTodo}
        onUpdateTodo={handleUpdateTodo}
      />
      <button onClick={handleDeleteTodos}>Delete All Todos</button>

      {/* DiaryPage 컴포넌트 렌더링 */}
      <DiaryPage
        date={date}
        diary={diary}
        handleDiarySaved={handleDiarySaved}
      />
    </div>
  );
};

export default DatePage;
