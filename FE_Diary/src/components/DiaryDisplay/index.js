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
      <h3>{diary.title}</h3>
      <p dangerouslySetInnerHTML={{ __html: diary.content }}></p>{" "}
      {/* HTML 태그 렌더링 */}
      <button className="edit-button" onClick={ableEditingMode}>
        수정
      </button>
      <button className="delete-button" onClick={handleDeleteClick}>
        삭제
      </button>
    </div>
  );
};

export default DiaryDisplay;
