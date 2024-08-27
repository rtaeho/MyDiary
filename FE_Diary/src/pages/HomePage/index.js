import React from "react";
import { useNavigate } from "react-router-dom";
import KakaoLoginButton from "../../components/KakaoLoginButton"; // KakaoLoginButton 컴포넌트를 임포트

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
      <KakaoLoginButton /> {/* 카카오 로그인 버튼 추가 */}
    </div>
  );
};

export default HomePage;
