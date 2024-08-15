// src/pages/DiaryPage/index.js
import React from "react";
import DiaryForm from "../../components/DiaryForm";

const DiaryPage = () => {
  return (
    <div className="diary-page">
      <h1>일기 작성</h1>
      <DiaryForm />
    </div>
  );
};

export default DiaryPage;
