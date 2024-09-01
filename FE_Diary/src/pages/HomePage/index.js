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
      <p className="description">
        MyDiary는 당신의 일상과 할 일을 기록하고
        <br />
        관리할 수 있는 간단하고 직관적인 다이어리 앱입니다.
      </p>
      <div className="features">
        <div className="feature-item">
          <i className="icon-calendar"></i>
          <h2>캘린더 보기</h2>
          <p>하루의 일정을 한눈에 파악하세요.</p>
        </div>
        <div className="feature-item">
          <i className="icon-pencil"></i>
          <h2>할 일 목록 작성</h2>
          <p>
            할 일 목록을 작성하고
            <br />
            체계적으로 관리하세요.
          </p>
        </div>
        <div className="feature-item">
          <i className="icon-diary"></i>
          <h2>일기 쓰기</h2>
          <p>
            하루의 소중한 기억을
            <br />
            기록으로 남기세요.
          </p>
        </div>
      </div>
      <button className="start-button" onClick={handleStart}>
        지금 시작하기
      </button>
    </div>
  );
};

export default HomePage;
