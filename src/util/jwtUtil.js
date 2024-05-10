import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/todoApi";

const jwtAxios = axios.create()
const refreshJWT = async (accessToken, refreshToken) => {
    const host = API_SERVER_HOST
    const header = {headers:{'Authorization':`Bearer ${accessToken}`}}
    const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`, header)
    console.log(res.data)
    return res.data
}

//before request
const beforeReq = (config) => {
    console.log("before request.............")
    const memberInfo = getCookie('member')
    if(!memberInfo) {
        console.log("Member NOT FOUND")
        return Promise.reject(
            {response:
                {data:
                    {error:"REQUIRE_LOGIN"}
                }
            }
        )
    }

    const {accessToken} = memberInfo
    console.log("----------------------------" + accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`

    
    return config
}

//fail request
const requestFail = (err) => {
    console.log("request error............")
    return Promise.reject(err)
}

//before return response
const beforeRes = async (res) => {
    console.log("before return response...........")
    const data = res.data
    if(data && data.error === 'ERROR_ACCESS_TOKEN') {
        const memberCookieValue = getCookie('member')
        const result = await refreshJWT(memberCookieValue.accessToken, memberCookieValue.refreshToken)
        
        // 새로운 accessToken 과 refreshToken
        memberCookieValue.accessToken = result.accessToken
        memberCookieValue.refreshToken = result.refreshToken
        setCookie('member', JSON.stringify(memberCookieValue), 1)
        const originalRequest = res.config
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`
        return await axios(originalRequest)

    }
    return res
}


//fail response
const responseFail = (err) => {
    console.log("response fail error.............")
    return Promise.reject(err);
}

jwtAxios.interceptors.request.use( beforeReq, requestFail )
jwtAxios.interceptors.response.use( beforeRes, responseFail)

export default jwtAxios
