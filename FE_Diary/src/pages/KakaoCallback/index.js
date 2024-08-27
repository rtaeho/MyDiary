import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { kakaoLogin } from "../../api/kakao";

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      kakaoLogin(code)
        .then((response) => {
          console.log("Kakao API Response:", response);
          const { accessToken } = response;
          localStorage.setItem("accessToken", accessToken);
          navigate("/");
        })
        .catch((error) => {
          console.error("카카오 로그인 실패:", error);
        });
    } else {
      console.warn("No Kakao authorization code found in URL.");
    }
  }, []);

  return <div>로그인 중입니다...</div>;
};

export default KakaoCallback;
