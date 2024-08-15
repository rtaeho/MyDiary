// utils/dateUtils.js

/**
 * 날짜를 'yyyy-MM-dd' 형식으로 변환합니다.
 * @param {string} date - 변환할 날짜 (일반적으로 'yyyy-MM-dd' 형식)
 * @returns {string} 변환된 날짜
 */
export const formatDate = (date) => {
  const [year, month, day] = date.split("-");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};
