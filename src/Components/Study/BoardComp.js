import React, { useEffect, useState } from "react";
import { findAllBoards } from "../../Api/Api"
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import "./RoomStyles.css"
import styled from "styled-components";
import Modal from "../Modal/Modal";

const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(6,1fr);
    grid-template-rows: repeat(2,1fr);
    grid-auto-rows: 1fr;
    grid-gap: 10px;
    margin: 10px 10%;
    justify-items: center;
    @media (max-width: 900px) {
        grid-template-columns: repeat(4,1fr);
        grid-template-rows: repeat(2,1fr);
    }
`;

const CardContext = [
    {id:0, img: 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', title: '정문 콜밴 파티원'}, 
    {id:1, img:'https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',title:'콜밴=콜라 밴'}
];

const BoardComp = () => {
    const navigate = useNavigate();
    const [boards, setBoards] = useState([]);
    const { isLogin, isChecked } = useSelector((state) => state.users);
    const [isModalUp, setIsModalUp] = useState(false);

    useEffect(() => {
        findAllBoards()
            .then(response => response.data.data.map((board) => (
                setBoards((prev) => [...prev, board]))
            ))
            .catch(error => console.log(error));
    }, [])

    const onNavigate = () => {
        if (isChecked && isLogin) {
            navigate("/study/create");
            return;
        }
        else {
            setIsModalUp(true);
        }
    }

    return (
        <div>
            <button onClick={onNavigate}>게시글 개설</button>
            {isModalUp && <Modal title={<p>로그인 필요!</p>} ModalHandler={() => setIsModalUp(false)}><p><Link to='/login'>로그인</Link>이 필요한 서비스 입니다.</p></Modal>}
            <CardWrapper>
            {boards.map((board, idx) => 
            (<Link to = {{pathname:`/study/${board.studyId}`}} key={idx}>
                <Card key={board.studyId} titleImg={CardContext[0].img}><h3>{board.title}</h3><h3>{board.topic}</h3></Card>
            </Link>))}
            </CardWrapper>
        </div>
    )
}

export default BoardComp