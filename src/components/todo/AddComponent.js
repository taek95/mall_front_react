
import React, { useState } from 'react';
import ResultModal from '../common/ResultModal';
import useCustomMove from '../../hooks/useCustomMove';
import { postAdd } from '../../api/todoApi'


const initState = {
    title:'',
    content:'',
    dueDate:''
}

function AddComponent(props) {

    const [todo, setTodo] = useState({...initState})
    const [res,setRes] = useState(null)
    const {moveToList} = useCustomMove()

    // e는 event
    const handleChangeTodo = (e) => {
        // todo[title]이 되는 것 동적으로, event가 발생한 target의 name, js의 유연함
        todo[e.target.name] = e.target.value
        setTodo({...todo})
    }

    const handleClickAdd = () => {
        postAdd(todo).then(res => {
            // res는 이런 형태{TNO:104}
            // 결과 값이 있다면 modal창을 보여줘
            setRes(res.TNO)
            // 입력창의 데이터는 날려준다.
            setTodo({...initState})
        })
    }

    const closeModal = () => {
        setRes(null)
        moveToList()
    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                            name="title"
                            type={'text'}
                            value={todo.title}
                            onChange={handleChangeTodo}
                    > 
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">CONTENT</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                            name="content"
                            type={'text'} 
                            value={todo.content}
                            onChange={handleChangeTodo}
                    >
                    </input>
                </div>  
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">DUEDATE</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
                            name="dueDate"
                            type={'date'} 
                            value={todo.dueDate}
                            onChange={handleChangeTodo}
                    >    
                    </input>
                </div>
            </div>
        <div className="flex justify-end">
            <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
            <button type="button" 
                    className="rounded p-4 w-36 bg-blue-500 text-xl  text-white "
                    onClick={handleClickAdd}          
            >
            ADD
            </button>
            </div>
        </div>

        { res ? 
            <ResultModal
                title={'Add Result'}
                content={`New ${res} Added`}
                callbackFn={closeModal}
            />
            : 
            <></> }
    
    </div>
    )
}

export default AddComponent;