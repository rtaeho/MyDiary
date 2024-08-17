// src/components/DiaryForm/index.js
import React, { useState } from "react";
import { createDiary } from "../../api/diaryApi";

const DiaryForm = ({ date }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError("제목과 내용은 모두 필수 입력 항목입니다.");
      return;
    }

    try {
      const diaryData = { title, content };
      await createDiary(date, diaryData);
      setTitle(""); // 입력 필드 초기화
      setContent("");
      setSuccessMessage("일기가 성공적으로 저장되었습니다!");
      setError("");
    } catch (error) {
      setError("일기 저장에 실패했습니다. 다시 시도해 주세요.");
      setSuccessMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>날짜: {date}</h2>
      <div>
        <label htmlFor="title">제목:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div>
        <textarea
          value={content}
          onChange={handleContentChange}
          rows="10"
          cols="50"
          placeholder="일기를 작성하세요..."
          required
        />
      </div>
      <br />
      <button type="submit">저장</button>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default DiaryForm;
