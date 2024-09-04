import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill"; // react-quill 가져오기
import "react-quill/dist/quill.snow.css"; // 기본 스타일 추가
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

    const diaryData = { title, content }; // content는 HTML 포맷이 포함된 상태
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

  // 툴바 옵션에 글자 색상과 배경색 추가
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // 굵게, 기울임, 밑줄, 취소선
      [{ color: [] }, { background: [] }], // 글자 색상과 배경색
      ["link"], // 링크
    ],
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
        {/* ReactQuill로 content 입력 받기, 글자색과 배경색 옵션 추가 */}
        <ReactQuill value={content} onChange={setContent} modules={modules} />
      </div>
      {showWarning && <p className="diary-warning-message">{showWarning}</p>}
      <div className="diary-form__actions">
        <button onClick={handleSubmit}>{diary ? "수정" : "작성"}</button>
      </div>
    </div>
  );
};

export default DiaryForm;
