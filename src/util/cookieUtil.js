import { Cookies } from "react-cookie";

// react는 SPA라 새로고침을 누르면 다시 로그인을 해야함, 그래서 쿠키에 저장
const cookies = new Cookies() 

export const setCookie = (name, value, days = 1) => {

    const expires = new Date()
    // 보관기한
    expires.setUTCDate(expires.getUTCDate() + days)
    
    return cookies.set(name,value,{expires:expires, path:'/'})
}

export const getCookie = (name) => {
    return cookies.get(name);
}

export const removeCookie = (name, path = '/') => {
    cookies.remove(name, {path:path})
}