import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLogout } from "../../store/userSlice";
import KakaoLoginButton from "../../components/KakaoLoginButton";

const Header = () => {
  const { isLogin, nickname } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
        </ul>
        <ul>
          {isLogin ? (
            <>
              <li>{nickname}님, 환영합니다!</li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <KakaoLoginButton />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
