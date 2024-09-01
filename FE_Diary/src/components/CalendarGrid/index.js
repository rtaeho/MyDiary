import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";

const CalendarGrid = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

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

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  // 이전 달의 마지막 날짜 가져오기
  const prevMonthDays = new Date(year, month, 0).getDate();

  // 5줄(35칸)로 날짜 계산
  const days = Array.from({ length: 35 }, (_, i) => {
    if (i < startDay) {
      // 이전 달의 날짜
      return {
        date: prevMonthDays - startDay + i + 1,
        currentMonth: false,
      };
    } else if (i >= startDay && i < startDay + daysInMonth) {
      // 이번 달의 날짜
      return {
        date: i - startDay + 1,
        currentMonth: true,
      };
    } else {
      // 다음 달의 날짜
      return {
        date: i - startDay - daysInMonth + 1,
        currentMonth: false,
      };
    }
  });

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

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
      <hr />
      <div className="calendar-grid">
        <div className="calendar-grid__body">
          {days.map((day, index) => {
            const dayOfWeek = index % 7;
            let dayClass = "calendar-date";
            if (dayOfWeek === 0) {
              dayClass += " sunday"; // 일요일
            } else if (dayOfWeek === 6) {
              dayClass += " saturday"; // 토요일
            }
            if (!day.currentMonth) {
              dayClass += " other-month"; // 이전 달 또는 다음 달의 날짜
            }
            return (
              <div
                key={index}
                className={`calendar-grid__day ${
                  day.date ? dayClass : "calendar-empty"
                }`}
                onClick={
                  day.currentMonth ? () => handleDateClick(day.date) : null
                }
                style={{ cursor: day.currentMonth ? "pointer" : "default" }}
              >
                {day.date || ""}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;
