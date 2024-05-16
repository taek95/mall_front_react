import React, { useDebugValue, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAccessToken, getMemberWithAccessToken } from '../../api/kakaoApi';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/loginSlice';
import useCustomLogin from '../../hooks/useCustomLogin';


// 인가토큰을 이용해 access Token을 받는다.

function KakaoRedirectPage(props) {
    
    const [searchParams] = useSearchParams()

    const {moveToPath, saveAsCookie} = useCustomLogin()


    // authCode = 인가토큰
    const authCode = searchParams.get('code')

    
    useEffect(() => {
        getAccessToken(authCode).then(data => {
            const accessToken = data
            // result : JSON 데이터
            getMemberWithAccessToken(accessToken).then(memberInfo => {
                saveAsCookie(memberInfo)
                if(memberInfo && memberInfo.social) {
                    moveToPath("/member/modify")
                }else {
                    moveToPath("/")
                }
            })
        })
    }, [authCode]);

    return (
        <div>
            <div>KAKAO Login Redirect</div>
            <div> {authCode} </div>       
        </div>
    );
}

export default KakaoRedirectPage;