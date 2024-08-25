import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTodosByDate } from "../../api/todoApi";
import { getDiaryByDate } from "../../api/diaryApi";
import DiaryPage from "../DiaryPage"; // DiaryPage 컴포넌트 import
import TodoPage from "../TodoPage";

const DatePage = () => {
  const { date } = useParams();
  const [diary, setDiary] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTodosAndDiary = async () => {
      try {
        const [fetchedDiary] = await Promise.all([
          getTodosByDate(date),
          getDiaryByDate(date),
        ]);
        setDiary(fetchedDiary);
      } catch (error) {
        setError("Failed to fetch todos or diary.");
      }
    };
    fetchTodosAndDiary();
  }, [date]);

  const handleDiarySaved = (newDiary) => {
    setDiary(newDiary);
  };

  return (
    <div className="date-page">
      <h1>Date: {date}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Todo 관련 컴포넌트들 */}
      <TodoPage></TodoPage>
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
