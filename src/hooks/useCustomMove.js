import { useState } from "react"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"


const getNum = (param,defaultValue) => {
    if(!param){
        return defaultValue
    }
    return parseInt(param)
}

// 이동하는게 많으니까 로직을 하나로 묶어두자.
// 공통적인 부분을 재사용하기 위한 코드
// 모든 페이지마다 쿼리스트링 page, size남겨주기 위한 코드
const useCustomMove = () => {
    const navigate = useNavigate()

    // 1쪽에 있을 때 다시 1쪽을 누르면 변화가 없는데 변화 있게 만들기 위한 코드
    const [refresh, setRefresh] = useState(false)

    const [queryParams] = useSearchParams()
    const page = getNum(queryParams.get('page'), 1)
    const size = getNum(queryParams.get('size'), 10)
    
    // page=3&size=10 으로 만들어주기
    const queryDefault = createSearchParams({page,size}).toString()
    const moveToList = (pageParam) => {
        let queryStr = ""
        if(pageParam) {
            const pageNum = getNum(pageParam.page, 1)
            const sizeNum = getNum(pageParam.size,10)
            queryStr = createSearchParams({page:pageNum, size:sizeNum}).toString()
        } else {
            queryStr = queryDefault
        }
        
        setRefresh(!refresh)

        // search는 쿼리스트링 의미
        navigate({pathname:`../list`,search:queryStr})
    }

    const moveToModify = (num) => {
        navigate({
            pathname:`../modify/${num}`,
            search: queryDefault
        })
    }

    // num 은 tno 의미
    const moveToRead = (num) => {
        navigate({
            pathname:`../read/${num}`,
            search:queryDefault
        })

    }
    // 배열로 빼든 객체로 빼든 의미없다.. 이건 객체스타일
    return {moveToList, moveToModify, moveToRead, page, size, refresh}
}

export default useCustomMove