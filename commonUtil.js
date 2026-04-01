/**
 * @title 공통 javascript
 * @author Edward Beedoh Kim
 * @description commonUtil for javascript
 * @copyright (c) 2026 by Edward Beedoh Kim, All Rights Reserved
 * @license MIT
 * @see https://github.com/idealful/myPractice
 * @version 1.0
 * @since 2026-04-01
 * @last 2026-04-01
 */

/**
 * 콘솔 로그
 * @param {*} txt 내용
 * @param {*} color 컬러
 */
const consoleLog = (txt, color = 'black') => {
  console.log('%c' + txt, 'color:' + color);
};

/**
 * 클라이언트의 모바일 여부 확인
 * @returns {boolean}
 */
const isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );

/**
 * 숫자 천 단위 콤마 표기
 * @param {number} num
 * @returns {string} 1,000
 */
const formatCommaNumber = (num) => {
  return num.toLocaleString();
};

/**
 * 숫자 천 단위 콤마 표기 - 원화 화폐
 * @param {number} num
 * @returns {string} ₩1,000
 */
const formatCommaCurrency = (locale = 'ko-KR', currency = 'KRW', num = 0) => {
  return num.toLocaleString(locale, { style: 'currency', currency });
};

/**
 * 현재 날짜와 시간을 지정된 포맷으로 반환
 * @returns {string} yyyy-MM-dd HH:mm:ss
 */
const getNowDateTime = () => {
  const now = new Date();
  const fillZero = (num) => String(num).padStart(2, '0');

  const yyyy = now.getFullYear();
  const mm = fillZero(now.getMonth() + 1);
  const dd = fillZero(now.getDate());
  const hours = fillZero(now.getHours());
  const minutes = fillZero(now.getMinutes());
  const seconds = fillZero(now.getSeconds());

  return `${yyyy}-${mm}-${dd} ${hours}:${minutes}:${seconds}`;
};

/**
 * 두 날짜 객체 사이의 시간 차이를 초(sec) 단위로 계산
 * @param {Date} startTime 시작 시간
 * @param {Date} endTime 종료 시간
 * @returns {number} 차이(초)
 */
const getDiffSeconds = (startTime, endTime) => {
  const diffMs = endTime.getTime() - startTime.getTime();
  return Math.abs(Math.floor(diffMs / 1000));
};

/**
 * 시간 단위 계산
 * @param {string} unit 기준
 * @param {number} amount 숫자
 * @returns {number}
 */
const calDate = (unit = 'SS', amount = 0) => {
  let result = 0;

  switch (unit) {
    case 'SS':
      result = amount * 1000;
      break;
    case 'MI':
      result = amount * 1000 * 60;
      break;
    case 'HH':
      result = amount * 1000 * 60 * 60;
      break;
    case 'DD':
      result = amount * 1000 * 60 * 60 * 24;
      break;
    default:
      break;
  }

  return result;
};

/**
 * 쿠키 유틸 : 설정 및 조회
 */
const CookieUtil = {
  set: (name, value, unit, amount) => {
    let expires = '';
    if (unit && amount) {
      const date = new Date();
      date.setTime(date.getTime() + calDate(unit, amount));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  },
  get: (name) => {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
};
