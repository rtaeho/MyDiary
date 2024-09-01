import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../store/userSlice";
import KakaoLoginButton from "../../components/KakaoLoginButton";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isLogin, nickname } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&logout_redirect_uri=${process.env.REACT_APP_LOGOUT_REDIRECT_URI}`;
      console.log("로그아웃 성공");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setLogout());
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const handleNavigateHome = () => {
    navigate("/"); // 홈으로 이동
  };

  return (
    <header className="header">
      <div className="header-left">
        {isLogin ? (
          <span>{nickname}님 안녕하세요!</span>
        ) : (
          <span>Guest님 안녕하세요!</span>
        )}
      </div>
      <div className="header-center">
        <h1>
          <span className="header-title" onClick={handleNavigateHome}>
            MyDiary
          </span>
        </h1>
      </div>
      <div className="header-right">
        {isLogin ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <KakaoLoginButton />
        )}
      </div>
    </header>
  );
};

export default Header;
