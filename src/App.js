import {RouterProvider} from 'react-router-dom';
import root from "./router/root";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// react-query(비동기 로직을 쉽게 다룰수 있게, api가져오는 코드도 쉽게, 서버 상태 관리 도와주는 라이브러리) 사용
// QueryClient라는 함수 갖다 쓰는 표현법
const queryClient = new QueryClient()

function App() {
  //js영역
  return (
    //jsx 영역
    // QueryClientProvider를 통해 앱 전체에서 QueryClient에 접근 가능하도록 해준다.
    <QueryClientProvider client = {queryClient}>
      <RouterProvider router={root}/>
      <ReactQueryDevtools initialIsOpen={true}></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default App;
