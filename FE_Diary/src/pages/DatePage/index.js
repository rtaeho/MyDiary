import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DiaryPage from "../DiaryPage"; // DiaryPage 컴포넌트 import
import TodoPage from "../TodoPage";

const DatePage = () => {
  const { date } = useParams();
  const navigate = useNavigate();

  // 날짜를 변환하여 포맷팅
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  const day = String(dateObj.getDate()).padStart(2, "0");
  const weekDay = dateObj.toLocaleDateString("ko-KR", { weekday: "long" }); // 요일 구하기

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="date-page">
      <div className="date-header">
        <h1>{`${year}년 ${month}월 ${day}일 ${weekDay}`}</h1>
        <button className="back-button" onClick={handleBackClick}>
          뒤로가기
        </button>
      </div>
      {/* Todo 관련 컴포넌트들 */}
      <TodoPage />
      {/* DiaryPage 컴포넌트 렌더링 */}
      <DiaryPage />
    </div>
  );
};

export default DatePage;
