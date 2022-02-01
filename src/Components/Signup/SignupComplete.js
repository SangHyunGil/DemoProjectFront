import React from 'react';
import styled from 'styled-components';

const CompleteWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'NEXON Lv2 Gothic', sans-serif;
    box-shadow: 0 0 3px 0 rgba(0,0,0,0.75);
    padding: 1rem 0;
    margin: 0 auto;
    width: 40%;
    margin-top: 10rem !important;
    border-radius: 10px;
    text-align: center;
    @media (max-width: 790px) {
        box-shadow: none;
    }
    img {
        margin-bottom: 1rem;   
    }
    p {
        font-size: 2rem;
    }
    button {
        margin-top: 1rem;
        font-size: 1.6rem;
        padding: 0.5rem 1rem;
        border: 0;
        border-radius: 5px;
        background-color: #ffc107;
        display: flex;
        align-items: center;
        justify-content: center;
        a {
            text-decoration: none;
            color: white;
            font-weight: bolder;

        }
    }
`;

function SignupComplete() {
    return (
        <CompleteWrapper>
            <img src="/AuthImg/plane.png" alt="cheers" />
            <p>인증 메일 전송이 완료되었습니다.</p>
            <p>메일을 확인하러 가실까요?</p>
            <button><a href="https://portal.koreatech.ac.kr/p/STHOME/">아우누리</a></button>
        </CompleteWrapper>
    )
}

export default SignupComplete;