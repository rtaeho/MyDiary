import axiosInstance from "./axiosInstance";

const BASE_URL = "/todos";

// TODO 항목 추가
export const createTodo = async (date, todoData) => {
  try {
    const response = await axiosInstance.post(
      `${BASE_URL}?date=${date}`,
      todoData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create todo:", error);
    throw error;
  }
};

// 특정 날짜의 TODO 항목 조회
export const getTodosByDate = async (date) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}?date=${date}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    throw error;
  }
};

// 연도와 월로 TODO 항목 조회
export const getTodosByMonthAndYear = async (yearMonth) => {
  try {
    const response = await axiosInstance.get(
      `${BASE_URL}?yearMonth=${yearMonth}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch todos by month and year:", error);
    throw error;
  }
};

// ID로 특정 TODO 항목 조회
export const getTodoById = async (id) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch todo by id:", error);
    throw error;
  }
};

// TODO 항목 업데이트
export const updateTodo = async (id, todoData) => {
  try {
    const response = await axiosInstance.put(`${BASE_URL}/${id}`, todoData);
    return response.data;
  } catch (error) {
    console.error("Failed to update todo:", error);
    throw error;
  }
};

// 특정 TODO 항목 삭제
export const deleteTodoById = async (id) => {
  try {
    await axiosInstance.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error("Failed to delete todo:", error);
    throw error;
  }
};

// 특정 날짜의 모든 TODO 항목 삭제
export const deleteTodosByDate = async (date) => {
  try {
    await axiosInstance.delete(`${BASE_URL}?date=${date}`);
  } catch (error) {
    console.error("Failed to delete todos by date:", error);
    throw error;
  }
};

// 모든 TODO 항목 삭제
export const deleteAllTodos = async () => {
  try {
    await axiosInstance.delete(BASE_URL);
  } catch (error) {
    console.error("Failed to delete all todos:", error);
    throw error;
  }
};
