// ajax : 비동기 통신 웹개발의 기법
// axios : http 통신 가능하게 해주는 라이브러리

import axios from "axios";

// 경로 따기
export const API_SERVER_HOST = 'http://localhost:8080'
const prefix = `${API_SERVER_HOST}/api/todo`

// async로 tno 받아서 뭔가 실행하겠다.
// async : 비동기 의미
export const getOne = async (tno) => {
    // await는 async내부에서만 사용가능
    // await 오른쪽은 promise고 promise가 처리될 때까지 기다린다는 뜻
    const res = await axios.get(`${prefix}/${tno}`)
    return res.data;
}

export const getList = async (pageParam) => {
    const {page,size} = pageParam
    // params가 쿼리스트링이 된다.
    const res = await axios.get(`${prefix}/list`,{params:{page,size}})
    // res.data는 promise를 의미
    return res.data
}