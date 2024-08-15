import React, { useState, useEffect } from "react";
import CalendarGrid from "../../components/CalendarGrid";
import TodoList from "../../components/TodoList";
import { getTodosByDate } from "../../api/todoApi";
import { formatDate } from "../../utils/dateUtils"; // 날짜 형식 변환 유틸리티

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [todos, setTodos] = useState([]);

  const handleDateClick = (date) => {
    const formattedDate = formatDate(date); // 날짜를 올바른 형식으로 변환
    setSelectedDate(formattedDate);
  };

  useEffect(() => {
    if (selectedDate) {
      const fetchTodos = async () => {
        try {
          const fetchedTodos = await getTodosByDate(selectedDate);
          setTodos(fetchedTodos);
        } catch (error) {
          console.error("Error fetching todos:", error);
        }
      };

      fetchTodos();
    }
  }, [selectedDate]);

  return (
    <div>
      <h1>Calendar Page</h1>
      <CalendarGrid onDateClick={handleDateClick} />
      {selectedDate && (
        <div>
          <h2>Todos for {selectedDate}</h2>
          <TodoList todos={todos} />
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
