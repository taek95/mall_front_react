import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";


const initState = {
    email: ''
}

const loadMemberCookie = () => {
    // 쿠키에서 member 꺼내기
    const memberInfo = getCookie('member')
    return memberInfo
}

// param은 email과 pw 가지고 있음
export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => loginPost(param))

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: loadMemberCookie() || initState,
    reducers: {
        // state : 기존의 상태, action: 처리하고 싶은 데이터(parameter)
        login: (state,action) => {
            console.log("login...........", action)
            // 다음에 이렇게 데이터를 유지해줘, next state
            return {email: action.payload.email}
        },
        logout: () => {
            console.log("logout.........")
            removeCookie('member')
            return {...initState}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            console.log("fulfilled")
            const payload = action.payload
            if(!payload.error) {
                setCookie("member", JSON.stringify(payload), 1)
            }
            return payload
        })
        .addCase(loginPostAsync.pending, (state, action) => {
            console.log("pending")
        })
        .addCase(loginPostAsync.rejected, (state, action) => {
            console.log("rejected")
        })
    }

})

export const {login, logout} = loginSlice.actions
export default loginSlice.reducer