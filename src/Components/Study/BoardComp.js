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

const StudyWrapper = styled.section`
  background: linear-gradient(to top, #FDCB6E, #ffffff 60%);
  overflow: hidden;
  height: calc(100vh - 66px);
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

const LinkWrapper = styled.li`
  a {
    text-decoration: none;
    color: white;
    font-size: 1.5rem;
    white-space: pre;
  }
  background-color: rgba(253, 203, 110,1.0);
  padding: 10px 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 20px;
  }
`;

const StudyCardsWrapper = styled.div`
  
`;

const StudyInfoWrapper = styled.section`
`;

const Depart = [
  { id: 0, headTo: 'me', val: "기계공학부", img: "kut_logo.gif" },
  { id: 1, headTo: 'ece', val: "전기전자통신공학부", img: "kut_logo.gif" },
  { id: 2, headTo: 'dea', val: "디자인,건축공학부", img: "kut_logo.gif" },
  { id: 3, headTo: 'mce', val: "메카트로닉스공학부", img: "kut_logo.gif" },
  { id: 4, headTo: 'im', val: "산업경영학부", img: "kut_logo.gif" },
  { id: 5, headTo: 'emce', val: "에너지신소재화학공학부", img: "kut_logo.gif" },
  { id: 6, headTo: 'cse', val: "컴퓨터공학부", img: "kut_logo.gif" },
  { id: 7, headTo: 'esp', val: "고용서비스정책학부", img: "kut_logo.gif"},
  { id: 8, headTo: 'other', val: "기타", img: "kut_logo.gif"},
];

const BoardComp = () => {
  const navigate = useNavigate();
  const { isLogin, isChecked, studyIds } = useSelector((state) => state.users);
  const [isModalUp, setIsModalUp] = useState(false);
  const [studyHeight, setStudyHeight] = useState(0);

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
        <DepartWrapper
          modules={[Navigation]}
          slidesPerView={4}
          centeredSlides={true}
          navigation={true}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
        >
          {Depart?.map((depart) => (
            <SwiperSlide key={depart?.id}>
              <LinkWrapper>
                <img src={`/${depart?.img}`} alt={depart?.val} />
                <Link to={`/study/depart/${depart?.headTo}`} >{depart?.val}</Link>
              </LinkWrapper>
            </SwiperSlide>
          ))}
        </DepartWrapper>
        <StudyCardsWrapper>
          <Outlet />
        </StudyCardsWrapper>
      <StudyInfoWrapper>
        
      </StudyInfoWrapper>
    </StudyWrapper>
  );
};

export default BoardComp;
