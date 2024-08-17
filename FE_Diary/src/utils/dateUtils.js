// src/utils/dateUtils.js

/**
 * 날짜 객체를 'yyyy-MM-dd' 형식으로 변환합니다.
 * @param {Date} dateObj - 변환할 날짜 객체
 * @returns {string} 변환된 날짜 문자열
 */
export const formatDate = (dateObj) => {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
