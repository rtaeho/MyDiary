import axios from "axios";

const BASE_URL = "http://localhost:8080/api/diaries";

// 일기 생성
export const createDiary = async (date, diaryData) => {
  try {
    const response = await axios.post(`${BASE_URL}?date=${date}`, diaryData);
    return response.data;
  } catch (error) {
    console.error("Failed to create diary:", error);
    throw error;
  }
};

// 특정 날짜의 일기 조회
export const getDiaryByDate = async (date) => {
  try {
    const response = await axios.get(`${BASE_URL}?date=${date}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch diary:", error);
    throw error;
  }
};

// 일기 업데이트
export const updateDiary = async (date, diaryData) => {
  try {
    const response = await axios.put(`${BASE_URL}?date=${date}`, diaryData);
    return response.data;
  } catch (error) {
    console.error("Failed to update diary:", error);
    throw error;
  }
};

// 특정 날짜의 일기 삭제
export const deleteDiaryByDate = async (date) => {
  try {
    await axios.delete(`${BASE_URL}?date=${date}`);
  } catch (error) {
    console.error("Failed to delete diary:", error);
    throw error;
  }
};

// 모든 일기 삭제
export const deleteAllDiaries = async () => {
  try {
    await axios.delete(`${BASE_URL}`);
  } catch (error) {
    console.error("Failed to delete all diaries:", error);
    throw error;
  }
};
