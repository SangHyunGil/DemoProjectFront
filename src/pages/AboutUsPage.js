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
`;

const AboutUsQuote = styled.section`
    height: 50vh;
    max-height: 500px;
    background-image: url('https://cdn.pixabay.com/photo/2015/01/09/11/09/meeting-594091_960_720.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: rgba(0,0,0,0.2);
    background-blend-mode: multiply;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: white;
    gap: 1rem;
    text-align: center;
    h2 {
        font-size: 3rem;
    }
    .StudyAction {
        button {
            border: none;
            background-color: #0049af;
            padding: 1rem 2rem;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            transition: all 0.3s linear;
            border-radius: 5px;
            &:hover {
                background-color: #ffc107;
                transition: all 0.3s linear;
            }

        }
    }
`;

const AboutUsFooter = styled.footer`
    max-height: 500px;
    .footerName {
        display: flex;
        justify-content: center;
        align-items: center;
        h2 {
            font-size: 2rem;
        }
        margin: 1rem;
    }
    .footerMain {
        display: flex;
        justify-content: center;
        gap: 2rem;
        flex-wrap: wrap;
        margin-bottom: 1rem;
        .card {
            display: flex;
            box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
            width: 30ch;
            .cardImg {
                padding: 1rem;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                    border-radius: 50%;
                }
            }
            .cardContent {
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 1rem;
                hr {
                    width: 100%;
                    border: 0;
                    border-top: 1px solid black;
                }
            }
            &:first-child {
                .cardImg {
                    background-color: #EA746A;
                }
            }
            &:last-child { 
                .cardImg {
                    background-color: #92BBA6;
                }
            }
        }
    }
    @media (max-width: 390px) {
        margin-bottom: 6rem;
        .footerMain {
            .card {
                flex-direction: column;
                text-align: center;
            }
        }
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
        </AboutUSMain>
        <AboutUsQuote>
            <h2>Let's Study Together!</h2>
            <div className="StudyAction">
                <button>스터디 보러 가기</button>
            </div>
        </AboutUsQuote>
        <AboutUsFooter>
            <div className="footerName">
               <h2>Contact Us</h2> 
            </div>
            <div className="footerMain">
                <div className='card'>
                    <div className="cardImg">
                        <img src='https://cdn.pixabay.com/photo/2017/04/01/21/06/portrait-2194457_960_720.jpg' alt='cardImg' />
                    </div>
                    <div className="cardContent">
                        <h3 className='name'>유승범</h3>
                        <p className='title'>FrontEnd Developer</p>
                        <hr />
                        <p className="email">syu9710@gmail.com</p>
                    </div>
                </div>
                <div className='card'>
                    <div className="cardImg">
                        <img src='https://cdn.pixabay.com/photo/2017/04/01/21/06/portrait-2194457_960_720.jpg' alt='cardImg' />
                    </div>
                    <div className="cardContent">
                        <h3 className='name'>길상현</h3>
                        <p className='title'>BackEnd Developer</p>
                        <hr />
                        <p className="email">zizon5941@gmail.com</p>
                    </div>
                </div>
            </div>
        </AboutUsFooter>
    </>
  )
}

export default AboutUsPage;