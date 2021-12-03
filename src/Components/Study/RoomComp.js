import React, { useEffect, useState } from "react";
import { findAllRooms } from "../../Api/Api";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./RoomStyles.css"

const RoomComp = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const { isLogin, isChecked } = useSelector((state) => state.users);

    useEffect(() => {
        findAllRooms()
            .then(response => response.data.data.map((room) => (
                setRooms((prev) => [...prev, room]))
            ))
            .catch(error => console.log(error));
    }, [])

    const onNavigate = () => {
        if (isChecked && isLogin) {
            navigate("/study/create");
            return;
        }
        navigate("/login")
    }

    return (
        <div className="rm">
            <button onClick={onNavigate}>개설</button>
            {rooms.map((room, idx) => (
                <Link to = {{pathname:`/study/${room.roomId}`}} key={idx}>제목 {room.roomName} - 방장 {room.memberName} </Link>
            ))} 
            <br />
        </div>
    )
}

export default RoomComp