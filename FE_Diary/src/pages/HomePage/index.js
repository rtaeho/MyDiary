import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/calendar");
  };

  return (
    <div className="home-page">
      <h1 className="title">MyDiary</h1>
      <button className="start-button" onClick={handleStart}>
        시작하기
      </button>
    </div>
  );
};

export default HomePage;
