import React from 'react';
import styled from 'styled-components';
import { motion ,useViewportScroll, useTransform } from 'framer-motion';

const Header = styled(motion.section)`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HeaderMainText = styled(motion.h1)`
    color: rgba(245, 246, 250,1.0);
`;

const Main = styled(motion.section)`
    
`;

const CardWrapper = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(4, minmax(300px, 1fr));
    gap: 3%;
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, minmax(300px, 1fr));
        gap: 3%;
    }
`;

const MainCards = styled(motion.div)`
    padding: 20px;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
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

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 300
    },
    visible: {
        opacity: 1,
        y: 50,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
  };


const Temp = () => {
    const { scrollYProgress } = useViewportScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);
    return (
        <React.Fragment>
            <Header transition={{duration:2,delayChildren:0.5}} initial={{opacity:0,background:'rgba(0,0,0,1)'}} animate={{opacity:1,background:"rgba(140, 122, 230,1.0)"}}>
                <HeaderMainText variants={TextVariants} initial="start" animate="end" >XX에 오신것을 환영합니다!</HeaderMainText>
            </Header>
            <Main>
               <CardWrapper variants={container} initial="hidden" animate="visible">
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
                <div style={{height:'10vh'}}>
                </div>
                <motion.div style={{height:'100vh'}}>
                    <motion.img style={{scale}} src='social.png' alt='main-img' />
                </motion.div>
                
            </Main>
            
        </React.Fragment>
    )
}

export default Temp;