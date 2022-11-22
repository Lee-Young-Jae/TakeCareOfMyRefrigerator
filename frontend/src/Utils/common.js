// Date를 ---년 00월 00일 로 반환
export const getDateString = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (month < 10 && day < 10) {
    return `${year}년 0${month}월 0${day}일`;
  }
  if (month < 10) {
    return `${year}년 0${month}월 ${day}일`;
  }
  if (day < 10) {
    return `${year}년 ${month}월 0${day}일`;
  }
  return `${year}년 ${month}월 ${day}일`;
};
