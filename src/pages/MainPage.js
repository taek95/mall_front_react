// page는 레이아웃을 가지고 틀을 짠다.
// conponent들이 모여서 page를 이룬다.

import React from 'react';
import BasicLayout from '../layouts/BasicLayout';

// props란 하나의 컴포넌트에서 다른 컴포넌트로 데이터를 전달할 때 사용
function MainPage(props) {
    return (
        // basiclayout 쓰는 방법, 안에는 children에 들어간다. 
        <BasicLayout>
            <div className={'text-3xl'}>Main Page</div>
        </BasicLayout>
        
    );
};

export default MainPage;