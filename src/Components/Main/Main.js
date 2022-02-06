import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion/dist/framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { useNavigate } from "react-router-dom";
import "swiper/swiper.scss";
import "swiper/modules/navigation/navigation.scss";
import "swiper/modules/effect-coverflow/effect-coverflow.scss";
import "swiper/modules/pagination/pagination.scss";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

const Images = [
  "/MainImg/001.png",
  "/MainImg/002.png",
  "/MainImg/003.png",
];

const Header = styled(motion.section)`
  height: 70vh;
  display: flex;
  align-items: center;
  background-color: transparent;
`;

const HeaderSlider = styled(Swiper)`
  height: 90%;
  .swiper-slide {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: fill;
      border-radius: 10px;
    }
  }
  .swiper-button-prev {
    color: white;
    left: 11%;
  }
  .swiper-button-next {
    color: white;
    right: 11%;
  }
  @media (max-width: 860px) {
    .swiper-slide {
      img {
        object-fit: cover;
      }
    }
  }
`;

const SubSlider1 = styled(Swiper)`
  width: 100%;
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 300px;
    img {
      display: block;
      width: 100%;
    }
  }
`;

const Main = styled(motion.section)`
  height: auto;
  padding: 2rem 0;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 480px) {
    height: auto;
  }
  hr {
    width: 70%;
    border-top-width: 1px;
    border-color: rgba(0, 0, 0, 0.2);
    margin: 5% 0;
    @media (max-width: 900px) {
      width: 100%;
    }
  }
`;

const MainInfo = styled.div`
  display: flex;
  width: 70%;
  align-items: center;
  div {
    margin-left: 10%;
  }
  h3 {
    font-family: "NEXON Lv2 Gothic", sans-serif;
    font-size: 2rem;
  }
  p {
    font-family: sans-serif;
  }
  @media (max-width: 480px) {
    flex-direction: column;
    div {
      margin-left: 0;
      text-align: center;
    }
  }
  @media (min-width: 481px) and (max-width: 900px) { 
    width: 90%;
  }
`;

const SubInfo = styled.div`
  display: flex;
  width: 70%;
  flex-grow: 1;
  @media (max-width: 480px) {
    flex-direction: column;
    div {
      align-items: center;
    }
  }
`;

const SubInfoBlockStyle = styled.div`
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  svg {
    font-size: 3rem;
    color: #2980b9;
  }
  & + & {
    margin-left: 5%;
  }
  h3 {
    margin: 10px 0;
  }
`;

const TodaysStudySection = styled(motion.section)`
  height: 50vh;
  background: #dfe7e9;
  h1 {
    text-align: center;
  }
`;

const SubInfoBlock = (props) => {
  const { Icon, Subtitle, SubContent } = props;
  return (
    <SubInfoBlockStyle>
      {Icon}
      <h3>{Subtitle}</h3>
      <p>{SubContent}</p>
    </SubInfoBlockStyle>
  );
};

const ImgInfoSection = styled(motion.section)`
  height: 80vh;
  background: url('/StudyImg/StudyingPeople.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  position: relative;
  &:after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImgInfoWrapper = styled.div`
  z-index: 10;
  width: 70%;
  display: flex;
  align-items: center;
  text-align: center;
  @media (min-width: 901px) and (max-width: 1400px) {
    width: 90%;
    .text-wrapper {
      margin-right: 0 !important;
    }
  }
  @media (max-width: 900px) {
    .text-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 0 !important;
    }
    .img-wrapper {
      display: none;
    }
  }
  .text-wrapper {
    color: white;
    font-family: sans-serif;
    margin-right: 10%;
    line-height: 1.5;
    h2, p {
      margin-bottom: 20px;
    }
    h2 {
      font-size: 3rem;
    }
    .study-button {
      cursor: pointer;
      background: #2980b9;
      border: 0;
      color: white;
      font-weight: bolder;
      padding: 10px 20px;
      border-radius: 10px;
    }
  }
  .img-wrapper {
    width: 90%;
    position: relative;
    img {
      width: 100%;
    }
    .text-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      div {
        color: black;
        display: inline-block;
        font-size: 2vw;
        border-radius: 20px;
        font-weight: bolder;
        padding: 10px 20px;
      }
      .mySpeechBubble {
        position: relative;
        align-self: flex-start;
        margin-left: 10%;
        &:after {
          content: '';
          position: absolute;
          border-top: 15px solid #2980b9;
          border-right: 0px solid transparent;
          border-left: 15px solid transparent;
          border-bottom: 0px solid transparent;
          top: 10px;
          left: -10px;
        }
        background: #2980b9;
        color: white;
      }
      .opponentSpeechBubble {
        background: rgba(255,235,51,1);
        align-self: flex-end;
        margin: 10px 10% 10px 0;
        position: relative;
        &:after {
          content: '';
          position: absolute;
          border-top: 15px solid rgba(255,235,51,1);
          border-right: 15px solid transparent;
          border-left: 0px solid transparent;
          border-bottom: 0px solid transparent;
          top: 10px;
          right: -10px;
        }
      }
    }
  }
`;

const TextChattingVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 1,
    }
  },
};

const TextChattingItemVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const MainComp = () => {
  const animation = useAnimation();
  const ImgAnimation = useAnimation();
  const TextAnimation = useAnimation();
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  const [ref2, inView2] = useInView({ threshold: 0.2 });

  useEffect(() => {
    inView ? TextAnimation.start("visible") : TextAnimation.start("hidden");
  }, [TextAnimation, inView]);

  return (
    <React.Fragment>
      <Header>
        <HeaderSlider
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={"auto"}
          centeredSlides={true}
          navigation={true}
          spaceBetween={50}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {Images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt="" />
            </SwiperSlide>
          ))}
        </HeaderSlider>
      </Header>
      <Main>
        <MainInfo>
          <motion.img src="/main-logo.png" alt="main logo" />
          <div>
            <h3>한기대만의, 한기대를 위한 스터디 골목</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              pharetra aliquet mi, ac semper orci egestas eget. Duis convallis
              leo efficitur lectus hendrerit faucibus. In hac habitasse platea
              dictumst. Suspendisse potenti. Pellentesque dapibus, dolor at
              finibus fringilla, purus nisi mollis magna
            </p>
          </div>
        </MainInfo>
        <hr />
        <SubInfo>
          <SubInfoBlock
            Icon={<InsertEmoticonIcon />}
            Subtitle="스터디 골목"
            SubContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            pharetra aliquet mi, ac semper orci egestas eget."
          />
          <SubInfoBlock
            Icon={<ThumbUpOffAltIcon />}
            Subtitle="편리함"
            SubContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            pharetra aliquet mi, ac semper orci egestas eget."
          />
          <SubInfoBlock
            Icon={<AccessibilityNewIcon />}
            Subtitle="공부하기 편안함"
            SubContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            pharetra aliquet mi, ac semper orci egestas eget."
          />
        </SubInfo>
      </Main>
      <TodaysStudySection>
        <h1>오늘의 스터디</h1>
        <SubSlider1
          modules={[EffectCoverflow]}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={true}
          className="mySwiper"
        >
          {Images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt="" />
            </SwiperSlide>
          ))}
        </SubSlider1>
      </TodaysStudySection>
      <ImgInfoSection>
        <ImgInfoWrapper>
          <div className="text-wrapper">
            <h2>Lorem Ipsum!</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                pharetra aliquet mi, ac semper orci egestas eget.</p>
            <button className="study-button" onClick={()=>navigate("/study/depart/cse")}>스터디 보러가기</button>
          </div>
          <div className="img-wrapper">
            <motion.img src="/StudyImg/monitor.png" alt="monitor" />
            <motion.div ref={ref} variants={TextChattingVariants} initial="hidden" animate={TextAnimation} className="text-wrapper">
              <motion.div variants={TextChattingItemVariants} className="mySpeechBubble">우리 스터디 할래?</motion.div>
              <motion.div variants={TextChattingItemVariants} className="opponentSpeechBubble">어디서?</motion.div>
              <motion.div variants={TextChattingItemVariants} className="mySpeechBubble">코너에서!</motion.div>
            </motion.div>
          </div>
        </ImgInfoWrapper>
      </ImgInfoSection>
    </React.Fragment>
  );
};

export default MainComp;
