import React from "react";

const KakaoLoginButton = () => {
  const KAKAO_CLIENT_ID = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = `${window.location.origin}/auth/kakao/callback`;

  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;
  };

  return <button onClick={handleKakaoLogin}>카카오 로그인</button>;
};

export default KakaoLoginButton;
