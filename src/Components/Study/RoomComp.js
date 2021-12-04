import React, { useEffect, useState } from "react";
import { findAllRooms } from "../../Api/Api";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import "./RoomStyles.css"
import styled from "styled-components";
import Modal from "../Modal/Modal";
import PrivateRoute from "../PrivateRouter/PrivateRoute";

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

const RoomComp = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const { isLogin, isChecked } = useSelector((state) => state.users);
    const [isModalUp, setIsModalUp] = useState(false);

    useEffect(() => {
        findAllRooms()
            .then(response => response.data.data.map((room) => (
                setRooms((prev) => [...prev, room]))
            ))
            .catch(error => console.log(error));
    }, [])

    
    const onNavigate = () => {
        /*
        if (isChecked && isLogin) {
            navigate("/study/create");
            return;
        }
        navigate("/login")*/
        navigate("/study/create");
    }
    /*
    const CreateModalHandler = () => {
        setIsModalUp(true);
    };*/

    return (
        <div>
            <button onClick={onNavigate}>채팅방 개설</button>
            <CardWrapper>
            {rooms.map((room, idx) => 
            (<Link to = {{pathname:`/study/${room.roomId}`}} key={idx}>
                <Card key={room.roomId} titleImg={CardContext[0].img}><h3>{room.roomName}</h3><h3>{room.memberName}</h3></Card>
            </Link>))}
            </CardWrapper>
        </div>
    )
}
//{isModalUp && <PrivateRoute><Modal title={<p>채팅방 개설</p>} message={<p>메세지</p>} ModalHandler={()=>{setIsModalUp(false)}} /></PrivateRoute>}
export default RoomComp