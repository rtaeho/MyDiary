// src/components/DiaryDisplay/index.js
import React from "react";

const DiaryDisplay = ({ diary, onEdit }) => {
  return (
    <div className="diary-display">
      <h2>날짜: {diary.date}</h2>
      <h3>제목: {diary.title}</h3>
      <p>{diary.content}</p>
      <button onClick={onEdit}>수정</button>
    </div>
  );
};

export default DiaryDisplay;
