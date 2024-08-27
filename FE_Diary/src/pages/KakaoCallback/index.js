import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { kakaoLogin } from "../../api/kakao";
import { UserContext } from "../../contexts/UserContext";

const KakaoCallback = () => {
  const navigate = useNavigate();
  const { setNickname } = useContext(UserContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      kakaoLogin(code)
        .then(({ accessToken, nickname }) => {
          localStorage.setItem("accessToken", accessToken);
          setNickname(nickname);
          navigate("/");
        })
        .catch((error) => {
          console.error("카카오 로그인 실패:", error);
        });
    }
  }, [navigate, setNickname]);

  return <div>로그인 중입니다...</div>;
};

export default KakaoCallback;
