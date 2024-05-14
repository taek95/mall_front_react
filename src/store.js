// store는 금고 의미
// 리덕스 툴킷을 이용해 상태 관리

import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import cartSlice from "./slices/cartSlice";

export default configureStore({
    // reducer : 금고지기
    reducer: {
        "loginSlice": loginSlice,
        "cartSlice": cartSlice
    }
})