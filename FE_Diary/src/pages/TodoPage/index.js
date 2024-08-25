import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import TodoForm from "../../components/TodoForm";
import TodoList from "../../components/TodoList";
import { getTodosByDate } from "../../api/todoApi";

const TodoPage = () => {
  const { date } = useParams();
  const [todos, setTodos] = useState([]);

  // useCallback을 사용하여 fetchTodos 함수가 다시 생성되지 않도록 함
  const fetchTodos = useCallback(async () => {
    try {
      const fetchedTodos = await getTodosByDate(date);
      setTodos(fetchedTodos);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  }, [date]); // date가 변경될 때만 fetchTodos가 변경됨

  const handleTodoUpdate = () => {
    fetchTodos(); // 업데이트 시 할 일 목록을 다시 가져옴
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]); // fetchTodos가 변경될 때만 useEffect 실행

  return (
    <div className="todo-page">
      <h1>Date: {date}</h1>
      <TodoForm date={date} todo={null} onTodoUpdate={handleTodoUpdate} />
      <TodoList todos={todos} onTodoUpdate={handleTodoUpdate} />
    </div>
  );
};

export default TodoPage;
