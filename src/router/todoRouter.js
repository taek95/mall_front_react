// 깔끔하게 하기 위해 todo전용 라우터 따로 빼기
import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div className={'bg-red-700'}>Loading..</div>
const TodoList = lazy(() => import("../pages/todo/ListPage"))
const TodoRead = lazy(() => import("../pages/todo/ReadPage"))
const TodoAdd = lazy(() => import("../pages/todo/AddPage"))
const TodoModify = lazy(() => import("../pages/todo/ModifyPage"))

const todoRouter = () => {
    return [
        {
            // /list를 하면 절대경로로 찾아버린다.
            path: 'list',
            element: <Suspense fallback={Loading}><TodoList/></Suspense>
        },
        // redirect 하는 방법
        {
            path: '',
            // Navigate는 to값이 고정됨
            element: <Navigate replace={true} to={'list'}/>
        },
        {
            // :tno는 pathvarible 의미
            path: 'read/:tno',
            element: <Suspense fallback={Loading}><TodoRead/></Suspense>
        },
        {
            path: 'add',
            element: <Suspense fallback={Loading}><TodoAdd/></Suspense>
        },
        {
            path: 'modify/:tno',
            element: <Suspense fallback={Loading}><TodoModify/></Suspense>
        }
    ]
}

export default todoRouter;