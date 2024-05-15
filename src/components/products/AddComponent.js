
import React, { useRef, useState } from 'react';
import { postAdd } from '../../api/productsApi';
import FetchingModal from '../common/FetchingModal';
import ResultModal from '../common/ResultModal';
import useCustomMove from '../../hooks/useCustomMove';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const initState = {
    pname:'',
    pdesc:'',
    price:0,
    files: []
}

// FormData를 이용해서 files를 실어서 보낸다. -> post or put을 이용해 보낸다.

function AddComponent(props) {
    const [product, setProduct] = useState(initState)
    
    // 업로드 처리하기 위함
    const uploadRef = useRef()
    
    const {moveToList} = useCustomMove()

    const addMutation = useMutation({mutationFn: (product) => postAdd(product)})

    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value
        setProduct({...product})
    }

    const handleClickAdd = (e) => {
        
        const formData = new FormData()
        const files = uploadRef.current.files

        // files.length == 파일의 개수
        for(let i =0 ;i<files.length;i++) {
            formData.append("files",files[i])
        }

        formData.append("pname", product.pname)
        formData.append("pdesc", product.pdesc)
        formData.append("price", product.price)

        addMutation.mutate(formData)

    }

    // 새 상품 등록 시, 가지고 있는 list 무효화하고 등록된 새 상품 추가해서 리스트 가져오기
    const queryClient = useQueryClient()
    
    const closeModal = () => {
        queryClient.invalidateQueries("products/list")
        moveToList({page:1})
    }

    return (
        <div className='border-2 border-sky-200 mt-10 m-2 p-4'>
            
            {addMutation.isPending ? <FetchingModal/> : <></>}
            {addMutation.isSuccess ?
                <ResultModal
                    title={'Product Add Result'}
                    content={`${addMutation.data.Result}번 등록 완료`}
                    callbackFn={closeModal}/>
                :
                <></>
            }

            <div className='flex justify-center'>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                    <div className='w-1/5 p-6 text-right font-bold'>Product Name</div>
                    <input className='w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md'
                            name="pname"
                            type={'text'}
                            value={product.pname}
                            onChange={handleChangeProduct}
                    >
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Desc</div>
                    <textarea 
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
                        name="pdesc"
                        rows="4"
                        onChange={handleChangeProduct}
                        value={product.pdesc}>
                {product.pdesc}
            </textarea>
                </div>  
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                        name="price"
                        type={'number'} 
                        value={product.price}
                        onChange={handleChangeProduct}
                    >
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Files</div>
                    <input ref={uploadRef} 
                            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                            type={'file'} multiple={true}
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
        </div>
    );
}

export default AddComponent;