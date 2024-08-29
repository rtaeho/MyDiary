import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../../store/userSlice";
import KakaoLoginButton from "../../components/KakaoLoginButton";

const Header = () => {
  const { isLogin, nickname } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(setLogout());
    navigate("/");
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
