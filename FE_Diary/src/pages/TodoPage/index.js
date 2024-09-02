import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import TodoForm from "../../components/TodoForm";
import TodoList from "../../components/TodoList";
import { getTodosByDate } from "../../api/todoApi";

const TodoPage = () => {
  const { date } = useParams();
  const [todos, setTodos] = useState([]);

  const fetchTodos = useCallback(async () => {
    try {
      const fetchedTodos = await getTodosByDate(date);
      setTodos(fetchedTodos);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  }, [date]);

  const handleTodoUpdate = () => {
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const areAllTodosCompleted =
    todos.length > 0 && todos.every((todo) => todo.completed);

  return (
    <div
      className="todo-page"
      style={{ backgroundColor: areAllTodosCompleted ? "#d3f0e4" : "#ffffff" }}
    >
      <h1>Todo</h1>
      <div className="todo-container">
        <TodoForm date={date} todo={null} onTodoUpdate={handleTodoUpdate} />
        <TodoList todos={todos} onTodoUpdate={handleTodoUpdate} />
      </div>
    </div>
  );
};

export default TodoPage;
