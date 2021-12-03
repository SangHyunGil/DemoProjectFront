import React from "react";
import { createRoom } from "../../Api/Api";
import useInput from "../../hooks/useInput";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const MakeRoomComp = () => {
    const navigate = useNavigate();
    const [roomname, onChangeRoomname] = useInput("");
    const { id, accessToken } = useSelector((state) => state.users);

    const onCreateRoom = (e) => {
        e.preventDefault();
        createRoom(roomname, id, accessToken)
            .then(response => {navigate("/study")})
            .catch(error => console.log(error));
    }

    return (
        <div>
            <form onSubmit={onCreateRoom}>
                <label htmlFor="roomname">방 이름</label>
                <input id="roomname" value={roomname} onChange={onChangeRoomname}></input> <b />
                <button type="submit">개설</button>
            </form>
        </div>
    )
}

export default MakeRoomComp;