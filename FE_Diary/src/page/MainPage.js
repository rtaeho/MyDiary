import React from "react";
import { Link } from "react-router-dom";
import "../scss/MainPage.scss";

const MainPage = () => {
  return (
    <div className="main-page">
      <h1>MyDiary</h1>
      <Link to="/login">로그인</Link>
    </div>
  );
};

export default MainPage;
