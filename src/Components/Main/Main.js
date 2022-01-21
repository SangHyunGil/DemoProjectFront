import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion/dist/framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/effect-coverflow/effect-coverflow.scss';
import 'swiper/modules/pagination/pagination.scss';
import { Navigation, Pagination, EffectCoverflow } from "swiper";

const Images = [
  "https://cdn.pixabay.com/photo/2020/03/06/12/30/flamingos-4906958_960_720.jpg",
  "https://cdn.pixabay.com/photo/2019/10/11/16/56/cat-4542301_960_720.jpg",
  "https://cdn.pixabay.com/photo/2015/09/05/20/02/coding-924920_960_720.jpg",
  "https://cdn.pixabay.com/photo/2017/10/31/19/05/web-design-2906159_960_720.jpg",
  "https://cdn.pixabay.com/photo/2021/09/12/18/07/robin-6619184_960_720.jpg",
];

const Header = styled(motion.section)`
  height: 55vh;
  display: flex;
  align-items: center;
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

const TodaysStudySection = styled(motion.section)`
  height: 50vh;
  h1 {
    text-align: center;
  }
`;

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
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
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

const MainComp = () => {
  const animation = useAnimation();
  const ImgAnimation = useAnimation();
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
          modules={[Navigation, Pagination]}
          slidesPerView={"auto"}
          centeredSlides={true}
          navigation={true}
          spaceBetween={50}
          loop={true}
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
          <InfoSectionHeadImgWrapper
            ref={ref2}
            variants={InfoImgVariants}
            initial="hidden"
            animate={ImgAnimation}
          >
            <motion.img src="worry.png" alt="worry"></motion.img>
          </InfoSectionHeadImgWrapper>
        </InfoSection>
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
      </Main>
    </React.Fragment>
  );
};

export default MainComp;
