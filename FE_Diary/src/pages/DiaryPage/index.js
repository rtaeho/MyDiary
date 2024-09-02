import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DiaryForm from "../../components/DiaryForm";
import DiaryDisplay from "../../components/DiaryDisplay";

const mockDiary = {
  date: "2024-09-02",
  title: "9월 2일의 일기",
  content:
    "오늘은 날씨가 참 좋았다. 오랜만에 공원을 산책하며 여유로운 시간을 보냈다.",
};

const getDiaryByDate = async (date) => {
  if (date === mockDiary.date) {
    return mockDiary;
  }
  return null;
};

const DiaryPage = () => {
  const { date } = useParams();
  const [diary, setDiary] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [onSave, setOnSave] = useState(false);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const fetchedDiary = await getDiaryByDate(date);
        setDiary(fetchedDiary);
      } catch (error) {
        console.error("Failed to fetch diary:", error);
      }
    };
    fetchDiary();
    setOnSave(false);
  }, [date, onSave]);

  const editOnSave = () => {
    setOnSave(true);
  };

  const ableEditingMode = () => {
    setIsEditing(true);
  };

  const disableEditingMode = () => {
    setIsEditing(false);
  };

  const shouldApplyBackground = diary && !isEditing;

  return (
    <div
      className="diary-page"
      style={{ backgroundColor: shouldApplyBackground ? "#d3f0e4" : "#ffffff" }}
    >
      <h1>Diary</h1>
      {diary ? (
        isEditing ? (
          <DiaryForm
            date={date}
            diary={diary}
            editOnSave={editOnSave}
            disableEditingMode={disableEditingMode}
          />
        ) : (
          <DiaryDisplay
            diary={diary}
            editOnSave={editOnSave}
            ableEditingMode={ableEditingMode}
          />
        )
      ) : (
        <DiaryForm date={date} diary={diary} editOnSave={editOnSave} />
      )}
    </div>
  );
};

export default DiaryPage;
