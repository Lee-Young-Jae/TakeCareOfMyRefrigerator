import { iconDictionary } from "./iconDictionary";

// Date를 ---년 00월 00일 로 반환
export const getDateString = (input) => {
  const date = new Date(input);

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

/**
 * Date 두개의 차이를 일로 계산해서 반환
 * 시간이 지나면 음수로 반환
 */
export const getDiffDate = (date1, date2) => {
  // 시간 객체로 변환
  const dateObj1 = new Date(date1);
  const dateObj2 = new Date(date2);

  const diff = dateObj1.getTime() - dateObj2.getTime();

  // 일로 계산
  const diffDay = Math.round(diff / (1000 * 60 * 60 * 24));

  return diffDay;
};

/**
 * string에 배열속 문자열이 포함되어있는지 확인하고 포함되어 있으면 배열속 문자열 반환
 */
export const getContainString = (string, array) => {
  for (let i = 0; i < array.length; i++) {
    if (string.includes(array[i])) {
      return array[i];
    }
  }
  return null;
};

/**
 * iconDictionary 에서 해당하는 아이콘 반환
 */

export const getIcon = (string) => {
  const icon = getContainString(string, Object.keys(iconDictionary));

  if (icon) {
    return iconDictionary[icon];
  }
  return "🍽️";
};

/** String의 마지막 글자가 받침을 가지는지 확인 */
export const isLastCharJong = (string) => {
  const lastChar = string.slice(-1);
  const cho = lastChar.charCodeAt(0) - 44032;
  const jong = cho % 28;

  if (jong === 0) {
    return false;
  }
  return true;
};

/**
 *  String에 조사 를 붙여서 반환
 */
export const getJosaString = (string, josa) => {
  if (isLastCharJong(string)) {
    return string + josa[0];
  }
  return string + josa[1];
};

/**
 * String을 |로 구분하여 배열로 반환
 */
export const getArrayFromString = (string) => {
  return string.split("|");
};
