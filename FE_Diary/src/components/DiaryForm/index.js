// src/components/DiaryForm/index.js
import React, { useState } from "react";

const DiaryForm = () => {
  const [diaryContent, setDiaryContent] = useState("");

  const handleContentChange = (e) => {
    setDiaryContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 일기 저장 로직을 추가해야 합니다.
    alert("일기가 저장되었습니다!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={diaryContent}
        onChange={handleContentChange}
        rows="10"
        cols="50"
        placeholder="일기를 작성하세요..."
      />
      <br />
      <button type="submit">저장</button>
    </form>
  );
};

export default DiaryForm;
