
import React from 'react';

// 페이지 번호 만드는 컴포넌트
function PageComponent({serverData, movePage}) {
    
    return (
        <div className="m-6 flex justify-center">
            {serverData.prev ?
                <div
                    className="m-2 p-2 w-16 text-center font-bold text-blue-400"
                    onClick={() => movePage({page:serverData.prevPage})}>
                    Prev </div> : <></>}
            {serverData.pageNumList.map(pageNum =>
                <div
                    key={pageNum}
                    className={`m-2 p-2 w-12 text-center rounded shadow-md text-white ${serverData.current === pageNum ? 'bg-gray-500' : 'bg-blue-400'}`}
                    onClick={() => movePage({page:pageNum})}>
                    {pageNum}
                </div>        
            )}
            {serverData.next ?
                <div
                    className="m-2 p-2 w-16 text-center font-bold text-blue-400"
                    onClick={() => movePage({page:serverData.nextPage})}>
                    Next
                </div> : <></>}
        </div>
    );
}

export default PageComponent;