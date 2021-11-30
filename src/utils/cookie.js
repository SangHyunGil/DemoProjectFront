import { Cookies }  from "react-cookie"

const cookies = new Cookies();

/**
 * 쿠키 설정 메소드
 * @param {*} name 
 * @param {*} value 
 * @param {*} option 
 * @returns 
 */
export const setCookie = (name, value, option) => {
    return cookies.set(name, value, {...option});
}

/**
 * 쿠키 추출 메소드
 * @param {*} name 
 * @returns 
 */
export const getCookie = (name) => {
    return cookies.get(name);
}

/*
쿠키 삭세 메소드 
*/ 
export const removeCookie = (name) => {
    return cookies.remove(name);
}

export default cookies