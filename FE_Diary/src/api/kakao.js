import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// 카카오 로그인
export const kakaoLogin = async (code) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { code });
    return response.data;
  } catch (error) {
    console.error("Failed to login with Kakao", error);
    throw error;
  }
};
