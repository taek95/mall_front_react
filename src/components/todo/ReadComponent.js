import React, { useEffect, useState } from 'react';
import { getOne } from '../../api/todoApi';

// 비동기로 데이터 호출했는데 언제 올지몰라...
// 근데 원 코드에서는 다음 거로 해서 진행끝나
// 근데 데이터 호출이 이제서와 와 버렸어
// 그래서 상태가 바뀌어 다시 렌더링을 해.. 근데 또 그럼 데이터 호출코드가 일어나...
// react 컴포넌트는 상태가 바뀌면 다시 렌더링을 함
// 무한반복에 빠져버림..

// 기본값을 만들어서 뿌렸을 때 문제가 없게 만든다.
const initstate = {
    tno:0,
    title:'',
    content:'',
    dueDate:'',
    complete: false
}

function ReadComponent({tno}) {
    // 무한반복에 빠지지 않기위해 상태를 유지시킴
    const [todo, setTodo] = useState(initstate)
    // useEffect와 결합해서 사용
    // 어떤 상황일때 동작을 할거냐, []이 상황을 의미
    // 번호가 바뀌어야 다시 호출 됨
    useEffect(() => {
        getOne(tno).then(data => {
            console.log(data)
            setTodo(data)
        })
    }, [tno]);
    
    return (
        <div>
            
        </div>
    );
}

export default ReadComponent;