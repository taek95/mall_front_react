import { Suspense, lazy } from "react"
import { createBrowserRouter } from "react-router-dom"
import todoRouter from "./todoRouter"

const Loading = <div className={'bg-red-700'}>Loading..</div>

// 코드 스플리팅, lazy를 통해 dynamic import 실행, 하지만 이 컴포넌트는 단독으로 사용 불가
const Main = lazy(() => import("../pages/MainPage"))
const About = lazy(() => import("../pages/AboutPage"))
const TodoIndex = lazy(() => import("../pages/todo/IndexPage"))


// import시에 로딩 시간이 생김, suspense는 아직 렌더링이 준비되지 않은 컴포넌트가 있으면 로딩화면을 보여주고 준비되면 컴포넌트를 보여줌
const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: "about",
        element: <Suspense fallback={Loading}><About/></Suspense>
    },
    {
        path: "todo",
        element: <Suspense fallback={Loading}><TodoIndex/></Suspense>,
        // outlet 적용, 경로는 상위에서 이어짐
        // 이거 주석처리했다가 풀어주니 router작동하네 뭐지..
        children: todoRouter()
    },
])

export default root;