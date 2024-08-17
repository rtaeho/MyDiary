import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils"; // Import formatDate

const CalendarGrid = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateClick = (date) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      date
    );
    navigate(`/date/${formatDate(selectedDate)}`); // Use formatDate to format the date
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  const days = Array.from({ length: startDay + daysInMonth }, (_, i) => {
    if (i < startDay) {
      return null;
    } else {
      return i - startDay + 1;
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
        <button onClick={handlePreviousMonth}>Previous</button>
        <h2>{`${year} - ${month + 1 < 10 ? `0${month + 1}` : month + 1}`}</h2>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <div className="calendar-grid">
        <div className="calendar-grid__header">
          <div className="calendar-grid__day">Sun</div>
          <div className="calendar-grid__day">Mon</div>
          <div className="calendar-grid__day">Tue</div>
          <div className="calendar-grid__day">Wed</div>
          <div className="calendar-grid__day">Thu</div>
          <div className="calendar-grid__day">Fri</div>
          <div className="calendar-grid__day">Sat</div>
        </div>
        <div className="calendar-grid__body">
          {days.map((date, index) => (
            <div
              key={index}
              className={`calendar-grid__day ${
                date ? "calendar-date" : "calendar-empty"
              }`}
              onClick={() => date && handleDateClick(date)}
            >
              {date || ""}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;
