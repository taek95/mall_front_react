
import React from 'react';
import BasicLayout from '../layouts/BasicLayout';

function MainPage(props) {
    return (
        // 내용은 children에 들어간다. 
        <BasicLayout>
            <div className={'text-3xl'}>Main Page</div>
        </BasicLayout>
        
    );
};

export default MainPage;