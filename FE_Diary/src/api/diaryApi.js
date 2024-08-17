import axios from "axios";

const BASE_URL = "http://localhost:8080/api/diaries";

// 특정 날짜에 일기를 추가합니다.
export const createDiary = async (date, diaryData) => {
  try {
    const response = await axios.post(`${BASE_URL}?date=${date}`, diaryData);
    return response.data;
  } catch (error) {
    console.error("Failed to create diary:", error);
    throw error;
  }
};

// 특정 날짜에 대한 일기를 조회합니다.
export const getDiaryByDate = async (date) => {
  try {
    const response = await axios.get(`${BASE_URL}?date=${date}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch diary:", error);
    throw error;
  }
};

// 특정 날짜에 대한 모든 일기를 삭제합니다.
export const deleteDiaryByDate = async (date) => {
  try {
    await axios.delete(`${BASE_URL}?date=${date}`);
  } catch (error) {
    console.error("Failed to delete diary:", error);
    throw error;
  }
};

// 모든 일기를 삭제합니다.
export const deleteAllDiaries = async () => {
  try {
    await axios.delete(`${BASE_URL}/all`);
  } catch (error) {
    console.error("Failed to delete all diaries:", error);
    throw error;
  }
};
