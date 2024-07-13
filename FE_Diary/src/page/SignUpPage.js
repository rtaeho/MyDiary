import React from "react";
import { useNavigate } from "react-router-dom";
import "../scss/SignUpPage.scss";

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // 회원가입 처리 로직 추가
    navigate("/login");
  };

  return (
    <div className="signup-page">
      <h2>회원가입</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="username">아이디:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div>
          <label htmlFor="nickname">닉네임:</label>
          <input type="text" id="nickname" name="nickname" required />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignUpPage;
