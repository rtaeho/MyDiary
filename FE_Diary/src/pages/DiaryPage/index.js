// src/pages/DiaryPage/index.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDiaryByDate } from "../../api/diaryApi";
import DiaryForm from "../../components/DiaryForm";

const DiaryPage = () => {
  const { date } = useParams(); // URL에서 날짜를 가져옵니다.

  const [diary, setDiary] = useState(null); // 저장된 일기 상태
  const [error, setError] = useState(""); // 오류 메시지 상태

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const fetchedDiary = await getDiaryByDate(date);
        setDiary(fetchedDiary);
      } catch (error) {
        setError("일기를 불러오는 데 실패했습니다.");
      }
    };

    fetchDiary();
  }, [date]);

  return (
    <div className="diary-page">
      <h1>일기</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {diary ? (
        <div className="diary-display">
          <h2>날짜: {diary.date}</h2>
          <h3>제목: {diary.title}</h3>
          <p>{diary.content}</p>
        </div>
      ) : (
        <DiaryForm date={date} />
      )}
    </div>
  );
};

export default DiaryPage;
