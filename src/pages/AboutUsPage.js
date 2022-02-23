import React from 'react';
import styled from 'styled-components';

const AboutUsHeader = styled.header`
    height: 80vh;
    background-color: #FFC107;
    padding: 1%;
    display: flex;
    justify-content: center;
    align-items: center;
    .HeaderWrapper {
        width: 99%;
        height: 98%;
        background-image: url('https://cdn.pixabay.com/photo/2015/07/31/11/45/library-869061_960_720.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-color: rgba(0,0,0,0.2);
        background-blend-mode: multiply;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        .imgBlock {
            display: flex;
            justify-content: center;
            align-items: center;
            width:  80%;
            img {
                max-width: 100%;
            }
        }
        .QuoteBlock {
            color: white;
            width: 80%;
            text-align: center;
        }
    }
`;

function AboutUsPage() {
  return (
    <>
        <AboutUsHeader>
            <div className='HeaderWrapper'>
                <div className="imgBlock">
                    <img src='https://koner-bucket.s3.ap-northeast-2.amazonaws.com/logo/KakaoTalk_20220128_143615435.png' alt='main-logo' />
                </div>
                <div className="QuoteBlock">
                    <h2>Koner에 오신것을 환영합니다!</h2>
                </div>
            </div>
        </AboutUsHeader>
    </>
  )
}

export default AboutUsPage;