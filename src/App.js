import {RouterProvider} from 'react-router-dom';
import root from "./router/root";

// 리액트의 컴포넌트(js함수형태)는 html(정확히 말하면 JSX)를 return
function App() {
  //js영역
  return (
    //JSX(js의 확장 문법, XML과 비슷) 영역
    <RouterProvider router={root}/>
  );
}

export default App;
