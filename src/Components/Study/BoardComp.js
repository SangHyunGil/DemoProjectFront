import React, { useEffect, useState } from "react";
import { findAllBoards } from "../../Api/Api";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Avatar from '@mui/material/Avatar';
import "./RoomStyles.css";
import styled from "styled-components";
import Modal from "../Modal/Modal";
import { useQuery } from "react-query";

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 10px;
  margin: 10px 10%;
  justify-items: center;
  @media (max-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
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
`;

const CardContext = [
  {
    id: 0,
    img: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    title: "정문 콜밴 파티원",
  },
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    title: "콜밴=콜라 밴",
  },
];

const BoardComp = () => {
  const navigate = useNavigate();
  const { isLogin, isChecked, studyIds } = useSelector((state) => state.users);
  const [isModalUp, setIsModalUp] = useState(false);

  const { data:boards } = useQuery("allBoards", findAllBoards,{
    select: (x) => x.data.data,
    onSuccess: () => {
      console.log(boards);
    }
  });

  const onNavigate = () => {
    if (isChecked && isLogin) {
      navigate("/study/create");
      return;
    } else {
      setIsModalUp(true);
    }
  };

  return (
    <>
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
      <CardWrapper>
        {boards?.map((board, idx) => (
          <Link style={{textDecoration: 'none'}} to={{ pathname: `/study/${board.studyId}` }} key={idx}>
            <StudyCard>
              <CardHeader
                avatar={
                  <Avatar src={board.creator?.profileImgUrl} />
                }
                title={board.creator?.nickname}
              />
              <CardMedia
                component="img"
                height="140"
                image={CardContext[0].img}
                alt="study Thumbnail"
              />
              <CardContent>
                <h2>{board.title}</h2>
                {board.tags?.map((tag)=>(
                  <TagWrapper key={Math.random()}>{tag}</TagWrapper>
                ))}
                <p>{`recruit: ${board?.recruitState}`}</p>
                <p>{`study: ${board?.studyState}`}</p>
              </CardContent>
            </StudyCard>
          </Link>
        ))}
      </CardWrapper>
    </>
  );
};

export default BoardComp;
