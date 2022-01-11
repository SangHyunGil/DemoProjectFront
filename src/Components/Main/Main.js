import React, { useEffect } from "react";
import styled from "styled-components";
import {
  motion,
  useAnimation,
} from "framer-motion";
import { ReactComponent as Group } from "../../Assets/group-study.svg";
import { useInView } from "react-intersection-observer";

const Header = styled(motion.section)`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(220, 240, 249, 1);
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
    flex: 1;
    padding: 0;
    align-items: center;
  }
`;

const HeaderMainText = styled(motion.h1)`
  color: rgba(13, 58, 92, 1);
  font-family: "OTWelcomeBA", sans-serif;
  font-size: 3rem;
`;

const HeaderSubText = styled(motion.p)`
  color: rgba(13, 58, 92, 1);
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

const Main = styled(motion.section)``;

const CardWrapper = styled(motion.div)`
  display: grid;
  padding: 20px 10vw;
  background: rgba(185, 199, 210, 1);
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 5% 3%;
  @media (max-width: 800px) {
    row-gap: 10px;
  }
`;

const MainCards = styled(motion.div)`
  padding: 20px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  background: rgba(210, 218, 226, 1);
`;

const InfoSection = styled(motion.div)`
  height: 100vh;
  background: rgba(144, 173, 205, 1);
`;

const InfoSectionHeadTextWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "OTWelcomeBA", sans-serif;
  h2 {
    flex-shrink: 0;
    font-size: 3rem;
    padding-top: 2rem;
  }
  p {
    flex-shrink: 0;
  }
`;

const InfoSectionHeadImgWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-top: 10vh;
  img {
    height: 40vh;
  }
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
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const variants = {
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      delayChilden: 0.5,
      staggerChildren: 0.5,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const InfoTextVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.5,
      delayChilden: 0.3,
      staggerChildren: 0.3,
    },
  },
};

const InfoImgVariants = {
  hidden: {
    opacity: 0,
    y:100,
  },
  visible: {
    opacity: 1,
    y:0,
    transition: {
      duration: 1.5,
    },
  },
};

const InfoTextItemVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const Temp = () => {
  const animation = useAnimation();
  const ImgAnimation = useAnimation();
  const [ref, inView] = useInView();
  const [ref2, inView2] = useInView({threshold:0.2});

  useEffect(() => {
    inView? animation.start("visible"): animation.start("hidden");
    inView2? ImgAnimation.start("visible"): ImgAnimation.start("hidden");
  }, [animation, inView, ImgAnimation, inView2]);

  return (
    <React.Fragment>
      <Header
        transition={{ duration: 2, delayChildren: 0.5 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <HeaderTextArea>
          <HeaderMainText variants={TextVariants} initial="start" animate="end">
            XX에 오신것을 환영합니다!
          </HeaderMainText>
          <HeaderSubText variants={TextVariants} initial="start" animate="end">
            "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit..."
          </HeaderSubText>
        </HeaderTextArea>
        <HeaderImgWrapper variants={TextVariants} initial="start" animate="end">
          <HeaderImg />
        </HeaderImgWrapper>
      </Header>
      <Main>
        <CardWrapper initial="hidden" animate="visible" variants={variants}>
          <MainCards variants={cardVariants}>
            <p>test</p>
          </MainCards>
          <MainCards variants={cardVariants}>
            <p>test</p>
          </MainCards>
          <MainCards variants={cardVariants}>
            <p>test</p>
          </MainCards>
          <MainCards variants={cardVariants}>
            <p>test</p>
          </MainCards>
        </CardWrapper>
        <InfoSection>
          <InfoSectionHeadTextWrapper
            ref={ref}
            variants={InfoTextVariants}
            initial="hidden"
            animate={animation}
          >
            <motion.h2 variants={InfoTextItemVariants}>ABOUT US</motion.h2>
            <motion.p variants={InfoTextItemVariants}>
              스터디원이 고민이세요?
            </motion.p>
          </InfoSectionHeadTextWrapper>
          <InfoSectionHeadImgWrapper ref={ref2} variants={InfoImgVariants} initial="hidden" animate={ImgAnimation}>
            <motion.img src="worry.png" alt="worry"></motion.img>
          </InfoSectionHeadImgWrapper>
        </InfoSection>
      </Main>
      <footer>
          <p>&copy;copyright, 길상현 유승범</p>
      </footer>
    </React.Fragment>
  );
};

export default Temp;
