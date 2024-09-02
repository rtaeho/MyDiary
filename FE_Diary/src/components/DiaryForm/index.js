import React, { useState, useEffect } from "react";
import { createDiary, updateDiary } from "../../api/diaryApi";
import { useSelector } from "react-redux";

const DiaryForm = ({ date, diary, editOnSave, disableEditingMode }) => {
  const [title, setTitle] = useState(diary ? diary.title : "");
  const [content, setContent] = useState(diary ? diary.content : "");
  const [showWarning, setShowWarning] = useState(""); // 경고 메시지 상태
  const isLogin = useSelector((state) => state.user.isLogin); // 로그인 상태 확인

  useEffect(() => {
    if (diary) {
      setTitle(diary.title);
      setContent(diary.content);
    }
  }, [diary]);

  const handleSubmit = async () => {
    if (!isLogin) {
      setShowWarning("로그인하지 않으면 저장되지 않습니다!");
      return;
    }

    if (!title && !content) {
      setShowWarning("일기를 작성해주세요!");
      return;
    }

    if (!title) {
      setShowWarning("제목을 입력해주세요!");
      return;
    }

    if (!content) {
      setShowWarning("내용을 입력해주세요!");
      return;
    }

    const diaryData = { title, content };
    try {
      if (diary) {
        await updateDiary(date, diaryData);
        disableEditingMode();
      } else {
        await createDiary(date, diaryData);
      }
      editOnSave();
      setShowWarning(""); // 성공적으로 저장되면 경고 메시지 숨기기
    } catch (error) {
      console.error("Failed to save diary:", error);
    }
  };

  return (
    <div className="diary-form">
      <div className="diary-input">
        <label htmlFor="title"></label>
        <input
          id="title"
          type="text"
          placeholder="제목 입력"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="diary-input">
        <label htmlFor="content"></label>
        <textarea
          id="content"
          placeholder="내용 입력"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      {showWarning && <p className="diary-warning-message">{showWarning}</p>}
      <div className="diary-form__actions">
        <button onClick={handleSubmit}>{diary ? "수정" : "작성"}</button>
      </div>
    </div>
  );
};

export default DiaryForm;
