import React, { useState, useEffect } from "react";
import { createDiary, updateDiary } from "../../api/diaryApi";

const DiaryForm = ({ date, diary, editOnSave, disableEditingMode }) => {
  const [title, setTitle] = useState(diary ? diary.title : "");
  const [content, setContent] = useState(diary ? diary.content : "");

  useEffect(() => {
    if (diary) {
      setTitle(diary.title);
      setContent(diary.content);
    }
  }, [diary]);

  const handleSubmit = async () => {
    const diaryData = { title, content };
    try {
      if (diary) {
        await updateDiary(date, diaryData);
        disableEditingMode();
      } else {
        await createDiary(date, diaryData);
      }
      editOnSave();
    } catch (error) {
      console.error("Failed to save diary:", error);
    }
  };

  return (
    <div className="diary-form">
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button onClick={handleSubmit}>
        {diary ? "Update Diary" : "Create Diary"}
      </button>
    </div>
  );
};

export default DiaryForm;
