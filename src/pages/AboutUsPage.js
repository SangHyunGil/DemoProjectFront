import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion/dist/framer-motion";
import MuiDialog from "../Components/Modal/MuiDialog";
import { useNavigate } from "react-router-dom";

const AboutUsHeader = styled.header`
  height: 30vh;
  max-height: 400px;
  background-color: #ffc107;
  padding: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  .HeaderWrapper {
    width: 99%;
    padding: 2rem 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: rgba(255, 255, 255, 1);
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
      width: 80%;
      img {
        max-width: 100%;
      }
    }
    .QuoteBlock {
      color: black;
      width: 80%;
      text-align: center;
    }
  }
`;

const AboutUSMain = styled.main`
  margin: 2rem;
  .MainTextContainer {
    margin-top: 1rem;
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
    display: grid;
    grid-template-columns: repeat(3, minmax(300px, 1fr));
    grid-gap: 1rem;
    row-gap: 3rem;
    margin: 4rem 0;
    .infoBlock {
      border: 1px solid black;
      border-radius: 5px;
      padding: 1rem 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      align-items: center;
      p {
        background-color: #0049af;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        transition: all 0.3s linear;
        &:hover {
          cursor: pointer;
          background-color: #ffc107;
          transition: all 0.3s linear;
        }
        
      }
    }
    @media (max-width: 960px) {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
  }
`;

const AboutUsQuote = styled.section`
  height: 50vh;
  max-height: 500px;
  background-image: url("https://cdn.pixabay.com/photo/2015/01/09/11/09/meeting-594091_960_720.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.2);
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
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
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
          background-color: #ea746a;
        }
      }
      &:last-child {
        .cardImg {
          background-color: #92bba6;
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

const DialogContainer = styled(MuiDialog)`
    .videoBlock {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 1rem 0;
        align-items: center;
          img {
            width: 80%;
            margin: 1rem auto;
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
  },
};

const HeaderItemVariants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const InfoAry = [
  {
    id: 0,
    title: "스터디 사용방법",
    videos: [
        {
            id: 0,
            title: "스터디 사용방법",
            url: 'https://koner-bucket.s3.ap-northeast-2.amazonaws.com/aboutus/%EC%8A%A4%ED%84%B0%EB%94%94+%EC%82%AC%EC%9A%A9%EB%B0%A9%EB%B2%95.gif'
        }
    ],
    content: "자세히 보기",
  },
  {
    id: 1,
    title: "쪽지 시스템",
    videos: [
        {
            id: 0,
            title: "쪽지 보내기",
            url: 'https://koner-bucket.s3.ap-northeast-2.amazonaws.com/aboutus/%EC%AA%BD%EC%A7%80-%EB%B3%B4%EB%82%B4%EA%B8%B0.gif'
        },
        {
            id: 1,
            title: '쪽지',
            url: 'https://koner-bucket.s3.ap-northeast-2.amazonaws.com/aboutus/%EC%AA%BD%EC%A7%80.gif'
        }
    ],
    content: "자세히 보기",
  },
  {
    id: 2,
    title: "화상채팅",
    videos: [
        {
            id: 0,
            title: "화상채팅 방생성",
            url: 'https://koner-bucket.s3.ap-northeast-2.amazonaws.com/aboutus/%ED%99%94%EC%83%81%EC%B1%84%ED%8C%85+%EB%B0%A9%EC%83%9D%EC%84%B1.gif'
        },
        {
            id: 1,
            title: "화상채팅 참여",
            url: 'https://koner-bucket.s3.ap-northeast-2.amazonaws.com/aboutus/%ED%99%94%EC%83%81%EC%B1%84%ED%8C%85+%EC%B0%B8%EC%97%AC.gif'
        },
        {
            id: 2,
            title: '화면 전환',
            url: 'https://koner-bucket.s3.ap-northeast-2.amazonaws.com/aboutus/%ED%99%94%EB%A9%B4%EC%A0%84%ED%99%98.gif'
        },
        {
            id: 3,
            title: '채팅',
            url: 'https://koner-bucket.s3.ap-northeast-2.amazonaws.com/aboutus/%EC%B1%84%ED%8C%85.gif'
        },
        {
            id: 4,
            title: '파일',
            url: 'https://koner-bucket.s3.ap-northeast-2.amazonaws.com/aboutus/%ED%8C%8C%EC%9D%BC.gif'
        }
    ],
    content: "자세히 보기",
  },
  {
    id: 3,
    title: "스케줄 사용하기",
    videos: [
        {
            id: 0,
            title: "스케줄 사용하기",
            url: 'https://koner-bucket.s3.ap-northeast-2.amazonaws.com/aboutus/%EC%8A%A4%ED%84%B0%EB%94%94+%EC%8A%A4%EC%BC%80%EC%A4%84.gif'
        }
    ],
    content: "자세히 보기",
  },
  {
    id: 4,
    title: "스터디 생성,수정,삭제",
    videos: [
        {
            id: 0,
            title: "스터디 만들기",
            url: 'https://koner-bucket.s3.ap-northeast-2.amazonaws.com/aboutus/%EC%8A%A4%ED%84%B0%EB%94%94+%EC%83%9D%EC%84%B1.gif'
        },
        {
            id: 1,
            title: "스터디 수정,삭제",
            url: 'https://koner-bucket.s3.ap-northeast-2.amazonaws.com/aboutus/%EC%8A%A4%ED%84%B0%EB%94%94+%EC%88%98%EC%A0%95%2C%EC%82%AD%EC%A0%9C.gif'
        }
    ],
    content: "자세히 보기",
  },
  {
    id: 5,
    title: "스터디 관리페이지",
    videos: [
        {
            id: 0,
            title: '스터디 승인',
            url: 'https://koner-bucket.s3.ap-northeast-2.amazonaws.com/aboutus/%EC%8A%A4%ED%84%B0%EB%94%94+%EC%8A%B9%EC%9D%B8.gif'
        },
        {
            id: 1,
            title: '스터디 거절',
            url: 'https://koner-bucket.s3.ap-northeast-2.amazonaws.com/aboutus/%EC%8A%A4%ED%84%B0%EB%94%94+%EA%B1%B0%EC%A0%88.gif'
        },
        {
            id: 2,
            title: '게시판 crud',
            url: 'https://koner-bucket.s3.ap-northeast-2.amazonaws.com/aboutus/%EA%B2%8C%EC%8B%9C%ED%8C%90+crud.gif'
        },
        {
            id: 3,
            title: '스터디 수정, 삭제',
            url: 'https://koner-bucket.s3.ap-northeast-2.amazonaws.com/aboutus/%EC%8A%A4%ED%84%B0%EB%94%94+%EC%88%98%EC%A0%95%2C%EC%82%AD%EC%A0%9C.gif'
        }
    ],
    content: "자세히 보기",
  },
];

const InfoBlock = (props) => {
  const [ModalOpen, setModalOpen] = useState(false);
  const onClose = () => {
      setModalOpen(false);
  }
  //console.log(props.videos);
  return (
    <React.Fragment>
      <div className="infoBlock">
        <h2>{props.title}</h2>
        <p onClick={()=>{setModalOpen(true)}} >{props.content}</p>
      </div>
      <DialogContainer open={ModalOpen} onClose={onClose} title={props.title} maxWidth={false}>
          {props.videos.map((video) => (
            <div className="videoBlock" key={video.id}>
              <h2>{video.title}</h2>
              <img  src={video.url} alt="video" />
            </div>
          ))}
      </DialogContainer>
    </React.Fragment>
  );
};

function AboutUsPage() {
  const navigate = useNavigate();
  return (
    <>
      <AboutUsHeader>
        <motion.div
          className="HeaderWrapper"
          variants={HeaderWrapperVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="imgBlock" variants={HeaderItemVariants}>
            <img
              src="https://koner-bucket.s3.ap-northeast-2.amazonaws.com/logo/KakaoTalk_20220128_143615435.png"
              alt="main-logo"
            />
          </motion.div>
          <motion.div className="QuoteBlock" variants={HeaderItemVariants}>
            <h2>코너에 오신것을 환영합니다!</h2>
          </motion.div>
        </motion.div>
      </AboutUsHeader>
      <AboutUSMain>
        <div className="MainTextContainer">
          <h2>코너 사용방법</h2>
        </div>
        <div className="MainContentContainer">
          {InfoAry.map((info) => (
            <InfoBlock
              key={info.id}
              title = {info.title}
              content = {info.content}
              videos = {info.videos}
            />
          ))}
        </div>
      </AboutUSMain>
      <AboutUsQuote>
        <h2>Let's Study Together!</h2>
        <div className="StudyAction">
          <button onClick={()=>{navigate('/study/depart/CSE')}} >스터디 보러 가기</button>
        </div>
      </AboutUsQuote>
      <AboutUsFooter>
        <div className="footerName">
          <h2>Contact Us</h2>
        </div>
        <div className="footerMain">
          <div className="card">
            <div className="cardImg">
            </div>
            <div className="cardContent">
              <h3 className="name">유승범</h3>
              <p className="title">Developer</p>
              <hr />
              <p className="email">syu9710@gmail.com</p>
            </div>
          </div>
          <div className="card">
            <div className="cardImg">
            </div>
            <div className="cardContent">
              <h3 className="name">길상현</h3>
              <p className="title">Developer</p>
              <hr />
              <p className="email">zizon5941@gmail.com</p>
            </div>
          </div>
        </div>
      </AboutUsFooter>
    </>
  );
}

export default AboutUsPage;
