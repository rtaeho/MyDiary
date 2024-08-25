import React from "react";
import { deleteDiaryByDate } from "../../api/diaryApi";

const DiaryDisplay = ({ diary, editOnSave, ableEditingMode }) => {
  const handleDeleteClick = async () => {
    try {
      await deleteDiaryByDate(diary.date);
      editOnSave();
    } catch (error) {
      console.error("Failed to delete diary:", error);
    }
  };

  return (
    <div className="diary-display">
      <h3>Title: {diary.title}</h3>
      <p>{diary.content}</p>
      <button onClick={ableEditingMode}>Edit Diary</button>
      <button onClick={handleDeleteClick}>Delete Diary</button>
    </div>
  );
};

export default DiaryDisplay;
