import React, {useEffect} from 'react';
import styled from 'styled-components';
import { motion ,useViewportScroll, useTransform, useAnimation } from 'framer-motion';
import {ReactComponent as Group} from '../../Assets/group-study.svg';
import { useInView } from "react-intersection-observer";

const Header = styled(motion.section)`
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(220, 240, 249,1);
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const HeaderTextArea = styled(motion.div)`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    padding-left: 10vw;
    @media (max-width: 768px) {
        align-items: center;
        padding: 0 20px;
        text-align: center;
    }
    @media (max-height: 650px) {
        flex:1;   
        padding: 0;
        align-items: center;
    }
`;

const HeaderMainText = styled(motion.h1)`
    color: rgba(13, 58, 92,1);
    @font-face {
        font-family: 'OTWelcomeBA';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/OTWelcomeBA.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'OTWelcomeBA', sans-serif;
    font-size: 3rem;
`;

const HeaderSubText = styled(motion.p)`
    color: rgba(13, 58, 92,1);
    font-size: 1.5rem;
`;

const HeaderImgWrapper = styled(motion.div)`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-height: 650px) {
        display: none;
    }
`;

const HeaderImg = styled(Group)`
    transform: scale(1);
    width: 80%;
    @media (min-width: 400px) and (max-width: 768px) {
        transform: scale(1.5);
    }
    @media (min-width: 399px) {
        transform: scale(1);
    }
`;

const Main = styled(motion.section)`
    
`;

const CardWrapper = styled(motion.div)`
    display: grid;
    padding: 20px 10vw;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 5% 3%;
    @media (max-width: 800px) {
        row-gap: 10px;
    }
`;

const MainCards = styled(motion.div)`
    padding: 20px;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    background: rgba(210, 218, 226,1.0);
`;

const InfoSection = styled(motion.div)`
    height: 100vh;
    background: rgba(210, 218, 226,1.0);
`;

const TextVariants = {
    start: {
        opacity: 0,
        y: 100,
    },
    end: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 2,
        }
    }
};


const cardVariants = {
    hidden: {
        opacity: 0,
        y: 100
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
};

const variants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {delayChilden: 0.3, staggerChildren: 0.3 },
    },
    hidden: {
      y: 100,
      opacity: 0,
    },
    out: {
        opacity: 0,
    }
};



const Temp = () => {
    const { scrollYProgress } = useViewportScroll();
    const scale = useTransform(scrollYProgress, [0.3, 1], [0.2, 1]);
    const animation = useAnimation();

    return (
        <React.Fragment>
            <Header transition={{duration:2,delayChildren:0.5}} initial={{opacity:0}} animate={{opacity:1}}>
                <HeaderTextArea>
                    <HeaderMainText variants={TextVariants} initial="start" animate="end" >XX에 오신것을 환영합니다!</HeaderMainText>
                    <HeaderSubText variants={TextVariants} initial="start" animate="end">
                        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
                    </HeaderSubText>
                </HeaderTextArea>
                <HeaderImgWrapper variants={TextVariants} initial="start" animate="end">
                    <HeaderImg />
                </HeaderImgWrapper>
            </Header>
            <Main>
               <CardWrapper initial="hidden" animate="visible" variants={variants} exit="out">
                    <MainCards variants={cardVariants} >
                        <p>test</p>
                    </MainCards>
                    <MainCards variants={cardVariants} >
                        <p>test</p>
                    </MainCards>
                    <MainCards variants={cardVariants} >
                        <p>test</p>
                    </MainCards>
                    <MainCards variants={cardVariants} >
                        <p>test</p>
                    </MainCards>
                </CardWrapper>
                <InfoSection>
                    <h2>INFO SECTION!</h2>
                    <p>Not Designed Yet!</p>
                </InfoSection>
            </Main>
            
        </React.Fragment>
    )
}

export default Temp;