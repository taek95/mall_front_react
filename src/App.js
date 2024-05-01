import { RouterProvider } from "react-router-dom";
import root from "./router/root"

// 리액트의 컴포넌트(js의 함수형태)는 html(정확히 말하면 JSX)을 return한다.
function App() {
  // js 영역
  return (
    // JSX(js의 확장 문법, XML과 비슷) 영역
    <RouterProvider router={root}/>
  );
}

// 컴포넌트를 밖으로 내보내겠다.
export default App;