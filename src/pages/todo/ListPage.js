import { useSearchParams } from "react-router-dom";

const ListPage = () => {

  // SearchParams란 query String 의미
  // useSearchParams에서 뽑아낸 애들이 queryParams
  const [queryParams] = useSearchParams()

  // 삼항연산자
  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1
  // 물건 개수
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10

  return ( 
    // 상위 페이지를 이용하기 때문에 여기서는 BasicLayout이 필요없음
    // 이것들은 outlet으로 들어감, 이것을 outlet 구조라고 한다.
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">
        Todo List Page Component --- {page} --- {size}
      </div> 
    </div>
  );
}
 
export default ListPage;
