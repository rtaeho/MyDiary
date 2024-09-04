import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";
import { getTodosByMonthAndYear } from "../../api/todoApi";

const CalendarGrid = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todos, setTodos] = useState([]);
  const [visibleTodosCount, setVisibleTodosCount] = useState(4); // 기본값은 4개
  const dayRefs = useRef([]);

  // 날짜 클릭 시 해당 날짜로 이동
  const handleDateClick = (date) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      date
    );
    navigate(`/date/${formatDate(selectedDate)}`);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const yearMonth = `${year}-${month + 1 < 10 ? `0${month + 1}` : month + 1}`;

  // 해당 월의 Todos를 가져오는 함수
  const fetchTodosByMonthAndYear = async (yearMonth) => {
    try {
      const response = await getTodosByMonthAndYear(yearMonth);
      setTodos(response);
    } catch (error) {
      console.error("Failed to fetch todos by month and year:", error);
    }
  };

  // 페이지가 로드될 때와 월/연도가 변경될 때 호출
  useEffect(() => {
    fetchTodosByMonthAndYear(yearMonth);
  }, [month, year, yearMonth]);

  // 화면 크기에 따라 표시할 Todo 항목 개수를 계산하는 함수
  const calculateVisibleTodosCount = () => {
    if (dayRefs.current.length > 0) {
      const sampleDayElement = dayRefs.current[0];
      const dayHeight = sampleDayElement.clientHeight;
      const dateNumberHeight =
        sampleDayElement.querySelector(".date-number").clientHeight;
      const availableHeight = dayHeight - dateNumberHeight;
      const todoItemHeight = sampleDayElement.querySelector(".todo-item")
        ? sampleDayElement.querySelector(".todo-item").clientHeight
        : 20; // 예상 높이

      const maxVisibleTodos = Math.floor(availableHeight / todoItemHeight);
      setVisibleTodosCount(maxVisibleTodos > 0 ? maxVisibleTodos : 1);
    }
  };

  // 창 크기가 변경될 때마다 Todo 항목 개수를 재계산
  useEffect(() => {
    calculateVisibleTodosCount();
    window.addEventListener("resize", calculateVisibleTodosCount);
    return () => {
      window.removeEventListener("resize", calculateVisibleTodosCount);
    };
  }, [todos]);

  // 달력의 날짜와 해당 날짜의 Todos를 생성
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const days = Array.from({ length: 35 }, (_, i) => {
    if (i < startDay) {
      return {
        date: prevMonthDays - startDay + i + 1,
        currentMonth: false,
        todos: [],
      };
    } else if (i >= startDay && i < startDay + daysInMonth) {
      const day = i - startDay + 1;
      const dateStr = `${yearMonth}-${day < 10 ? `0${day}` : day}`;
      const dayTodos = todos.filter((todo) => todo.date === dateStr);
      return {
        date: day,
        currentMonth: true,
        todos: dayTodos,
      };
    } else {
      return {
        date: i - startDay - daysInMonth + 1,
        currentMonth: false,
        todos: [],
      };
    }
  });

  // 이전 달로 이동
  const handlePreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePreviousMonth}>이전달</button>
        <h2>{`${year} - ${month + 1 < 10 ? `0${month + 1}` : month + 1}`}</h2>
        <button onClick={handleNextMonth}>다음달</button>
      </div>
      <div className="calendar-days">
        <span className="sunday">일</span>
        <span>월</span>
        <span>화</span>
        <span>수</span>
        <span>목</span>
        <span>금</span>
        <span className="saturday">토</span>
      </div>
      <div className="calendar-grid">
        <div className="calendar-grid__body">
          {days.map((day, index) => {
            const dayOfWeek = index % 7;
            let dayClass = "calendar-date";
            if (dayOfWeek === 0) {
              dayClass += " sunday";
            } else if (dayOfWeek === 6) {
              dayClass += " saturday";
            }
            if (!day.currentMonth) {
              dayClass += " other-month";
            }

            // 화면 너비에 따른 최대 Todo 표시 개수 설정
            const displayTodos = day.todos.slice(0, visibleTodosCount);
            const remainingTodosCount = day.todos.length - visibleTodosCount; // 남은 Todo 개수 계산
            const hasMoreTodos = remainingTodosCount > 0;
            return (
              <div
                key={index}
                className={`calendar-grid__day ${
                  day.date ? dayClass : "calendar-empty"
                }`}
                ref={(el) => (dayRefs.current[index] = el)}
                onClick={
                  day.currentMonth ? () => handleDateClick(day.date) : null
                }
                style={{ cursor: day.currentMonth ? "pointer" : "default" }}
              >
                <div className="date-number">{day.date || ""}</div>
                <div className="todo-list">
                  {displayTodos.map((todo, idx) => (
                    <div
                      key={idx}
                      className={`todo-item ${
                        todo.completed ? "completed" : ""
                      }`}
                    >
                      {todo.title}
                    </div>
                  ))}
                  {hasMoreTodos && (
                    <div className="more-todos">{`+ ${remainingTodosCount}개 더`}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;
