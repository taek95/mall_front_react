import { useSearchParams } from "react-router-dom";
import ListComponent from "../../components/todo/ListComponent";

const ListPage = () => {

  return ( 
    // 상위 페이지를 이용하기 때문에 여기서는 BasicLayout이 필요없음
    // 이것들은 outlet으로 들어감, 이것을 outlet 구조라고 한다.
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">
        Todo List Page Component
      </div> 
      <ListComponent/>
    </div>
  );
}
 
export default ListPage;
