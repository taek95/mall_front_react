import React from 'react';
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
function ReadPage(props) {

  const navigate = useNavigate()
  // useParams로 해당 페이지의 pathVariable 값 얻을수 있음
  const {tno} = useParams()
  console.log(tno)

  // tno의 수정 등 그 페이지에 들어갔을 때 그 tno 가 어느 페이지에 있었는지 쿼리 스트링으로 계속 남기고 싶을 때
  const [queryParams] = useSearchParams()
  const page = queryParams.get('page') ? parseInt(queryParams.get('page')) : 1
  const size = queryParams.get('size') ? parseInt(queryParams.get('size')) : 10
  const queryStr = createSearchParams({page:page,size:size}).toString()

  // search로 넣어주면 계속 쿼리스트링 남겨짐
  const moveToModify = (tno) => {
    navigate({
      pathname:`/todo/modify/${tno}`,
      search: queryStr
  })
  }

  // 목록으로 이동하기
  const moveToList = () => {
    navigate({
      pathname:`/todo/list`,
      search: queryStr
  })
  }

  return (
    <div className={'text-3xl'}>
      Todo Read Page {tno}
      <div>
        {/* parameter 있을 때 표기법 */}
        <button onClick={() => moveToModify(tno)}> Test Modify </button>
        {/* parameter 없을 때 표기법 */}
        <button onClick={moveToList}> Test List </button>
      </div>
    </div>
  );
}

export default ReadPage;