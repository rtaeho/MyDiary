import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { kakaoLogin } from "../../api/kakao";
import { setLogin } from "../../store/userSlice";

const KakaoCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      kakaoLogin(code)
        .then(({ accessToken, nickname }) => {
          localStorage.setItem("accessToken", accessToken);
          dispatch(setLogin(nickname));
          navigate("/");
        })
        .catch((error) => {
          console.error("카카오 로그인 실패:", error);
        });
    }
  }, [navigate, dispatch]);

  return <div>로그인 중입니다...</div>;
};

export default KakaoCallback;
