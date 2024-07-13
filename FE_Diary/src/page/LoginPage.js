import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../scss/LoginPage.scss";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // 로그인 처리 로직 추가
    navigate("/");
  };

  return (
    <div className="login-page">
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">아이디:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">로그인</button>
      </form>
      <Link to="/signup">회원가입</Link>
    </div>
  );
};

export default LoginPage;
