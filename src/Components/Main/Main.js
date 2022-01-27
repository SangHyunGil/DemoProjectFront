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
  "https://cdn.pixabay.com/photo/2020/03/06/12/30/flamingos-4906958_960_720.jpg",
  "https://cdn.pixabay.com/photo/2019/10/11/16/56/cat-4542301_960_720.jpg",
  "https://cdn.pixabay.com/photo/2015/09/05/20/02/coding-924920_960_720.jpg",
  "https://cdn.pixabay.com/photo/2017/10/31/19/05/web-design-2906159_960_720.jpg",
  "https://cdn.pixabay.com/photo/2021/09/12/18/07/robin-6619184_960_720.jpg",
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
      object-fit: cover;
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
  height: 70vh;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  @media (max-width: 900px) { 
    width: 100%;
  }
`;

const SubInfo = styled.div`
  display: flex;
  width: 70%;
  flex-grow: 1;
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
      div {
        position: absolute;
        color: black;
        display: inline-block;
        font-size: 3rem;
        border-radius: 20px;
        font-weight: bolder;
        padding: 10px 20px;
      }
      .mySpeechBubble {
        left: 10%;
        &:first-child {
          top: 10%;
        }
        &:last-child {
          top: 50%;
        }
        background: #2980b9;
        color: white;
      }
      .opponentSpeechBubble {
        right: 10%;
        top: 30%;
        background: rgba(255,235,51,1);
      }
    }
  }
`;


const Footer = styled.footer`
  height: 40vh;
  background: #202020;
`;

const MainComp = () => {
  const animation = useAnimation();
  const ImgAnimation = useAnimation();
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  const [ref2, inView2] = useInView({ threshold: 0.2 });

  useEffect(() => {
    inView ? animation.start("visible") : animation.start("hidden");
    inView2 ? ImgAnimation.start("visible") : ImgAnimation.start("hidden");
  }, [animation, inView, ImgAnimation, inView2]);

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
            delay: 2500,
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
            <motion.div className="text-wrapper">
              <div className="mySpeechBubble">우리 스터디 할래?</div>
              <div className="opponentSpeechBubble">어디서?</div>
              <div className="mySpeechBubble">코너에서!</div>
            </motion.div>
          </div>
        </ImgInfoWrapper>
      </ImgInfoSection>
      <Footer>

      </Footer>
    </React.Fragment>
  );
};

export default MainComp;
