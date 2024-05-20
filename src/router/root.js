import { Suspense, lazy } from "react"
import { createBrowserRouter } from "react-router-dom"
import todoRouter from "./todoRouter"
import productRouter from "./productRouter"
import memberRouter from "./memberRouter"

const Loading = <div className={'bg-red-700'}>Loading..</div>

// code splitting : 페이지가 /main, /about, /post 이렇게 세 가지 페이지로 이루어진 SPA를 개발한다고 할 때
// 한번에 가져와놓고 안쓰면 로딩도 느리고 무겁고 부작용이 있다.
// main으로 들어가는 동안 /about이나 /post 페이지 정보는 사용자에게 필요하지 않을 확률이 높다.
// 해결방법 : lazy를 통해 dynamic import 실행

const Main = lazy(() => import("../pages/MainPage"))
const About = lazy(() => import("../pages/AboutPage"))
const TodoIndex = lazy(() => import("../pages/todo/IndexPage"))
const ProductIndex = lazy(() => import("../pages/products/IndexPage"))

// import시에 로딩 시간이 생김, suspense는 아직 렌더링이 준비되지 않은 컴포넌트가 있으면 로딩화면을 보여주고 준비되면 컴포넌트를 보여줌
const root = createBrowserRouter([
    {
        path: "",
        // fallback : 대비책
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: "about",
        element: <Suspense fallback={Loading}><About/></Suspense>
    },
    {
        path: "todo",
        element: <Suspense fallback={Loading}><TodoIndex/></Suspense>,
        // outlet: 경로를 상위에서 이어지게 함
        // 오류 : 주석처리했다가 풀어주니 router작동
        children: todoRouter()
    },
    {
        path: "products",
        element: <Suspense fallback={Loading}><ProductIndex/></Suspense>,
        children: productRouter()
    },
    {
        path: "member",
        children: memberRouter()
    }
])

export default root;