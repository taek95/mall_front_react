import React, { useEffect, useState } from 'react';
import { API_SERVER_HOST } from '../../api/todoApi';
import { getOne } from '../../api/productsApi';
import FetchingModal from '../common/FetchingModal';
import useCustomMove from '../../hooks/useCustomMove';
import useCustomCart from '../../hooks/useCustomCart';
import useCustomLogin from '../../hooks/useCustomLogin';
import { useQuery } from '@tanstack/react-query';


const initState = {
    pno:0,
    pname:'',
    pdesc:'',
    price:0,
    uploadFileNames: []
}

const host = API_SERVER_HOST

const ReadComponent = ({pno}) => {

    const {moveToList, moveToModify , page, size} = useCustomMove()
    const {cartItems, changeCart} = useCustomCart()
    const {loginState} = useCustomLogin()

    // react를 쓰는 멋있는 이유중 하나래, useState, useEffect 대신 깔끔하게 사용 가능
    // v5 는 파라미터에 객체가 들어와야 한다.
    const {data, isFetching} = useQuery({
        // 식별자
        queryKey: ['products', pno],
        // 함수를 실행
        queryFn: () => getOne(pno),
        // stale : 상한, 신선하지 않은, -> 유통기한이 10초다, 10초가 지나서 조회하면 다시 서버 호출
        staleTime: 1000 * 10
    })

    const handleClickAddCart = () => {
        let qty = 1
        const addedItem = cartItems.filter(item => item.pno === parseInt(pno))[0]
        if(addedItem) {
            if(window.confirm('이미 추가된 상품입니다. 추가하시겠습니까?') === false) {
                return 
            }
            qty = addedItem.qty + 1
        }
        changeCart({email:loginState.email, qty:qty, pno:pno})

    }

    const product = data || initState

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {isFetching ? <FetchingModal /> : <></>}

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PNO</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
                        {product.pno}
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PNAME</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
                        {product.pname}
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PRICE</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
                        {product.price}
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PDESC</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
                        {product.pdesc}
                    </div>
                </div>
            </div>

            <div className="w-full justify-center flex flex-col m-auto items-center">
                {product.uploadFileNames.map( (imgFile, i) => 
                    <img 
                        alt="product" 
                        key={i} 
                        className="p-4 w-1/2" 
                        src={`${host}/api/products/view/${imgFile}`} />
                )}
            </div>

            <div className="flex justify-end p-4">
                <button type="button"
                        className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-green-500"
                        onClick={handleClickAddCart}
                >
                    Add Cart
                </button>
                <button type="button"
                        className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                        onClick={() => moveToModify(pno)}
                >
                    Modify
                </button>
                <button type="button"
                        className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                        onClick={() => moveToList({page,size})}
                >
                    List
                </button>
            </div>
        </div>

    );
}

export default ReadComponent;