import React, { useEffect, useState } from "react";
import { findAllBoards, findBoard } from "../../Api/Api";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Outlet,Link } from "react-router-dom";
import Card from "@mui/material/Card";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "./RoomStyles.css";
import styled from "styled-components";
import Modal from "../Modal/Modal";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/pagination/pagination.scss';
import { Navigation } from "swiper";
import { motion } from "framer-motion/dist/framer-motion";
import {useParams} from 'react-router-dom' 

const StudyWrapper = styled.section`
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(200px,1fr));
  grid-auto-rows: 1fr;
  grid-gap: 10px;
  margin: 10px 10%;
  justify-items: center;
  @media (max-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const AddCircleButton = styled(AddCircleIcon)`
  position: fixed;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 100;
`;

const StudyCard = styled(Card)`
  text-decoration: none;
`;

const TagWrapper = styled.span`
  background-color: #fd79a8;
  border-radius: 5px;
  padding: 0 5px;
  color: white;
  font-size: 12px;
`;

const DepartWrapper = styled(Swiper)`
  display: flex;
  list-style: none;
  margin: 60px 0;
`;

const LinkWrapper = styled(motion.div)`
  background: linear-gradient(to top,rgba(0,0,0,0.4), rgba(0,0,0,0)), url(${props => props.background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  &:hover {
    background: linear-gradient(to top,rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${props => props.background});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
    span {
      transition: all .5s linear;
      color: rgba(241, 196, 15,1.0);
    }
  }
  width: 170px;
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 0 1rem;
  span {
    font-family: 'SEBANG_Gothic_Bold' ,sans-serif;
    font-size: 1rem;
    white-space: pre-wrap;
    word-wrap: break-word;
    color: ${props => props.isActive ? 'rgba(241, 196, 15,1.0)' : 'white'};
    transition: all .5s linear;
  }
  p {
    font-family: 'SEBANG_Gothic_Bold' ,sans-serif;
    font-size: .4rem;
    color: rgba(255,255,255,1);
    text-align: center;
  }
`;


const StudyCardsWrapper = styled.div`
  
`;

const StudyInfoWrapper = styled.section`
  background: #63cdda;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
  }
`;

const Depart = [
  { id: 0, headTo: 'me', val: "기계공학부",ename:'School Of Mechanical Engineering', img: "/department/mech.jpg" },
  { id: 1, headTo: 'ece', val: "전기전자통신공학부",ename:'School of Electrical, Electronics & Communication Engineering',img: "/department/electro.jpg" },
  { id: 2, headTo: 'dea', val: "디자인,건축공학부",ename:'School of Industrial Design Engineering & Architectural Engineering',img: "/department/designArch.jpg" },
  { id: 3, headTo: 'mce', val: "메카트로닉스공학부",ename:'School of Mechatronics Engineering', img: "/department/meca.jpg" },
  { id: 4, headTo: 'im', val: "산업경영학부",ename:'School of Industrial Management', img: "/department/industiral.jpg" },
  { id: 5, headTo: 'emce', val: "에너지신소재 화학공학부",ename:'School of Energy Materials and Chemical Engineering', img: "/department/energyChemical.jpg" },
  { id: 6, headTo: 'cse', val: "컴퓨터공학부",ename:'School of Computer Science and Engineering', img: "/department/cse.jpg" },
  { id: 7, headTo: 'esp', val: "고용서비스정책학부",ename:'Department of Employment Services Policy', img: "/department/employmentService.jpg"},
  { id: 8, headTo: 'other', val: "기타",ename:'others', img: "/kut_logo.gif"},
];

const BoardComp = () => {
  const navigate = useNavigate();
  const { department } = useParams();
  const { isLogin, isChecked, studyIds } = useSelector((state) => state.users);
  const [isModalUp, setIsModalUp] = useState(false);


  const onNavigate = () => {
    if (isChecked && isLogin) {
      navigate("/study/create");
      return;
    } else {
      setIsModalUp(true);
    }
  };

  return (
    <StudyWrapper>
      <AddCircleButton color="primary" sx={{fontSize: 70}} onClick={onNavigate}></AddCircleButton>
        {isModalUp && (
          <Modal
            title={<p>로그인 필요!</p>}
            ModalHandler={() => setIsModalUp(false)}
          >
            <p>
              <Link to="/login">로그인</Link>이 필요한 서비스 입니다.
            </p>
          </Modal>
        )}
        <StudyInfoWrapper>
          <img src="/StudyImg/StudyMainImg.png" alt="study main img" />
        </StudyInfoWrapper>
        <DepartWrapper
          modules={[Navigation]}
          slidesPerView={1}
          centeredSlides={true}
          navigation={true}
          spaceBetween={10}
          loop={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            1600: {
              slidesPerView: 7,
            },
            1500: {
              slidesPerView: 6,
            },
            980: {
              slidesPerView: 5,
            },
            870: {
              slidesPerView: 4,
            },
            700: {
              slidesPerView: 3,
            },
          }}
        >
          {Depart?.map((depart) => (
            <SwiperSlide key={depart?.id}>
              <Link to={`/study/depart/${depart?.headTo}`} style={{textDecoration: 'none'}} >
                <LinkWrapper background={depart.img} isActive={department===depart.headTo} >
                  <motion.span>{depart?.val}</motion.span>
                  <p>{depart.ename}</p>
                </LinkWrapper>
              </Link>
            </SwiperSlide>
          ))}
        </DepartWrapper>
        <StudyCardsWrapper>
          <Outlet />
        </StudyCardsWrapper>
      
    </StudyWrapper>
  );
};

export default BoardComp;
