import {RouterProvider} from 'react-router-dom';
import root from "./router/root";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// 전체 상태 관리를 쉽게하기 위한 react-requery
const queryClient = new QueryClient()
// 리액트의 컴포넌트(js함수형태)는 html(정확히 말하면 JSX)를 return
function App() {
  //js영역
  return (
    <QueryClientProvider client = {queryClient}>
      <RouterProvider router={root}/>
      <ReactQueryDevtools initialIsOpen={true}></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default App;
