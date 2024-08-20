import axios from "axios";

const BASE_URL = "http://localhost:8080/api/todos";

// TODO 항목을 추가합니다.
export const createTodo = async (date, todoData) => {
  try {
    const response = await axios.post(`${BASE_URL}?date=${date}`, todoData);
    return response.data;
  } catch (error) {
    console.error("Failed to create todo:", error);
    throw error;
  }
};

// 특정 날짜에 대한 TODO 항목을 조회합니다.
export const getTodosByDate = async (date) => {
  try {
    const response = await axios.get(`${BASE_URL}?date=${date}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    throw error;
  }
};

// ID로 특정 TODO 항목을 조회합니다.
export const getTodoById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch todo by id:", error);
    throw error;
  }
};

// TODO 항목을 업데이트합니다.
export const updateTodo = async (id, todoData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, todoData);
    return response.data;
  } catch (error) {
    console.error("Failed to update todo:", error);
    throw error;
  }
};

// 특정 TODO 항목을 삭제합니다.
export const deleteTodoById = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error("Failed to delete todo:", error);
    throw error;
  }
};

// 특정 날짜에 대한 모든 TODO 항목을 삭제합니다.
export const deleteTodosByDate = async (date) => {
  try {
    await axios.delete(`${BASE_URL}?date=${date}`);
  } catch (error) {
    console.error("Failed to delete todos by date:", error);
    throw error;
  }
};

// 모든 TODO 항목을 삭제합니다.
export const deleteAllTodos = async () => {
  try {
    await axios.delete(BASE_URL);
  } catch (error) {
    console.error("Failed to delete all todos:", error);
    throw error;
  }
};
