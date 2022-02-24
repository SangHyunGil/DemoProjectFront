import React from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion/dist/framer-motion";

const AboutUsHeader = styled.header`
    height: 80vh;
    max-height: 1000px;
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
        flex: 1;
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

const AboutUSMain = styled.main`
    margin: 1%;
    .MainTextContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h2 {
            font-size: 2rem;
        }
        p {
            font-size: 1.5rem;
        }
    }
    .MainContentContainer {
        display: flex;
        gap: 5rem;
        margin-top: 4rem;
        .infoBlock {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        @media (max-width: 768px) {
            flex-direction: column;
        }
    }
    .MainContentAction {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const HeaderWrapperVariants = {
    hidden: {
    opacity: 1,
    },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.5,
            staggerChildren: 0.5,
        },
    }
};

const HeaderItemVariants = {
  hidden: {
      y: 50,
      opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  }   
};

const InfoAry = [
    {   
        id : 0,
        imgUrl : 'https://cdn.pixabay.com/photo/2015/07/19/10/00/school-work-851328_960_720.jpg',
        title : '우리는 어떤 것을 하고 있나요?',
        content: 'Lorem ipsum!',
    }
    ,{
        id : 1,
        imgUrl : 'https://cdn.pixabay.com/photo/2015/07/19/10/00/school-work-851328_960_720.jpg',
        title : '우리는 어떤 것을 하고 있나요?',
        content: 'Lorem ipsum!',
    }
    ,{
        id : 2,
        imgUrl : 'https://cdn.pixabay.com/photo/2015/07/19/10/00/school-work-851328_960_720.jpg',
        title : '우리는 어떤 것을 하고 있나요?',
        content: 'Lorem ipsum!',
    }
];

const InfoBlock = (props) => {
    return (
        <div className="infoBlock">
            <img src={props.imgUrl} alt="InfoBlockImg" />
            <h2>{props.title}</h2>
            <p>{props.content}</p>
        </div>
    );
};

function AboutUsPage() {
  return (
    <>
        <AboutUsHeader>
            <motion.div className='HeaderWrapper' variants={HeaderWrapperVariants} initial="hidden" animate="visible">
                <motion.div className="imgBlock" variants={HeaderItemVariants}>
                    <img src='https://koner-bucket.s3.ap-northeast-2.amazonaws.com/logo/KakaoTalk_20220128_143615435.png' alt='main-logo' />
                </motion.div>
                <motion.div className="QuoteBlock" variants={HeaderItemVariants}>
                    <h2>Koner에 오신것을 환영합니다!</h2>
                </motion.div>
            </motion.div>
        </AboutUsHeader>
        <AboutUSMain>
            <div className="MainTextContainer">
                <h2 className=''>About Us</h2>
                <p>Koner에 대해 소개 드립니다</p>
            </div>
            <div className="MainContentContainer">
                {InfoAry.map(info => <InfoBlock key={info.id} imgUrl={info.imgUrl} title={info.title} content={info.content} />)}
            </div>
            <div className="MainContentAction">
                <button>스터디 보러 가기</button>
            </div>
        </AboutUSMain>
    </>
  )
}

export default AboutUsPage;