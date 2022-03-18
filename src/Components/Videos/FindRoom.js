import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findVideoRooms } from "../../Api/Api";
import styled from "styled-components";
import { motion } from "framer-motion/dist/framer-motion";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
//import Modal from "../Modal/Modal";
import MuiDialog from '../Modal/MuiDialog';
import { useDispatch } from "react-redux";
import { getRoomInfo } from "../../reducers/roomReducer";
import { useParams } from "react-router-dom";
import { useQueryClient } from 'react-query';
import { getCookie } from "../../utils/cookie";
import { Avatar } from '@mui/material';
import { useQuery } from "react-query";

const CardWrapper = styled(motion.div)`
  width: 90vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, auto));
  grid-gap: 10px;
  justify-items: center;
  margin: 2rem auto;
  & > div {
    tex-decoration: none;
    width: 100%;
    &:hover {
      cursor: pointer;
    }
  }
`;

const RoomCard = styled(Card)`
  text-decoration: none;
  &:hover {
    background-color: rgb(203 227 251);
  }
  .nameWrapper {
    display: flex;
    align-items: center;
  }
  hr {
    border: 0;
    border-top: 1px solid #e0e0e0;
  }
`;

const FindRoom = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    //const [rooms, setRooms] = useState([]);
    const [pin, setPin] = useState("");
    const [joinRoom, setJoinRoom] = useState(false);
    const navigate = useNavigate();
    const { studyId } = useParams();
    const queryClient = useQueryClient();
    const myInfoData = queryClient.getQueryData(['loadMyInfo']);
  
    // const renderRoomData = rooms.map((room, index) => (
    //     <p key={index}> {room.room} : {room.description}</p>
    // ));

    const {data:rooms, refetch} = useQuery(['loadRooms', studyId],()=>findVideoRooms(studyId,getCookie('accessToken')), {
      select: (data) => data.data.data,
    });

    useEffect(()=>{
      refetch();
    },[refetch,rooms]);

    /*
    useEffect(() => {
      findVideoRooms(studyId,getCookie('accessToken'))
        .then(response => {
            const {data: {data}} = response;
            data.map((room) => (
                setRooms((prev) => [...prev, room]))
            )})
        .catch(error => console.log(error));
    }, [])*/

    useEffect(() => {
      if (myInfoData) {
        //console.log(myInfoData);
        const { data: {data: {nickname}} } = myInfoData;
        setUsername(nickname);
      }
    },[myInfoData]);

    const openModal = (room) => {
      setJoinRoom(room);
    }

    const closeModal = () => {
      setJoinRoom(false);
    };

    const changePinHandler = (e) => {
      setPin(e.target.value);
    }

    const joinRoomHandler = (room) => {
      dispatch(getRoomInfo({
        room: room.roomId,
        creator: username
      }));
      navigate(`/study/${studyId}/board/rooms/${room.roomId}?username=${username}`);
    }

    const joinRoomWithPWHandler = (room, pin) => {
      dispatch(getRoomInfo({
        room: room.roomId,
        creator: username
      }));
      navigate(`/study/${studyId}/board/rooms/${room.roomId}?pin=${pin}&username=${username}`);
    }

    return (
        <>
        <div>
        <CardWrapper>
          {rooms?.map((room) => {
            return (
              <div
                key={room.roomId}
                onClick={room.pin ? () => openModal(room) : () => joinRoomHandler(room)}
              >
                <RoomCard>
                  <CardContent>
                    <h2>{room.title}</h2>
                    <hr />
                    <div className="nameWrapper">
                      <Avatar alt={room?.creator?.nickname} src={room?.creator?.profileImgUrl} />
                      <p>{room?.creator?.nickname}</p>
                    </div>
                  </CardContent>
                </RoomCard>
              </div>
            );
          })}
        </CardWrapper>
        <MuiDialog
          open={joinRoom}
          onClose={closeModal}
          title="비밀번호 입력"
        >
          <form style = {{ display: "flex", justifyContent: "center" }} onSubmit={() => joinRoomWithPWHandler(joinRoom, pin)} >
            <p>
              비밀번호　
            </p>
            <input
                type="text"
                value={pin}
                onChange={changePinHandler}
            />
            <button type="submit">입장</button>
          </form>
        </MuiDialog>
        </div>
        </>
      );


}

export default FindRoom;