import { useState, useEffect } from "react";
import { createVideoRoom } from "../../Api/Api";
import MuiTextField from "../Mui/MuiTextField";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from 'react-query';
import { getCookie } from "../../utils/cookie";

const CreateRoomStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60vw;
    margin: 2rem auto;
    gap: 10px;
    padding: .5rem 1rem;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    & > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        & > div {
            width: 100%;
        }
    }
    & > button {
        width: 100%;
        border: none;
        background-color: #0049af;
        color: white;
        font-size: 1.2rem;
        padding: 0.5rem;
        transition: 0.3s all linear;
        &:hover {
            background-color: #ffc107;
            transition: 0.3s all linear;
            cursor: pointer;
        }
    }
`;

const CreateRoom = () => {
  const [username, setUsername] = useState(null);
  const [roomname, setRoomname] = useState("");
  const [serverErrorMsg, setServerErrorMsg] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const myInfoData = queryClient.getQueryData(['loadMyInfo']);
  const { studyId } = useParams();

  useEffect(() => {
    if (myInfoData) {
      //console.log(myInfoData);
      const { data: {data: {id}} } = myInfoData;
      setUsername(id);
    }
  },[queryClient,myInfoData]);

  const changeRoomnameHandler = (e) => {
    setRoomname(e.target.value);
  };

  const changePinHandler = (e) => {
    setPin(e.target.value);
  };

  const createRoomHandler = (e) => {
    e.preventDefault();
    let request = null;
    if (pin === "") {
      request = {
        request: "create",
        title: roomname,
        memberId: username,
      };
    } else {
      request = {
        request: "create",
        title: roomname,
        pin: pin,
        memberId: username,
      };
    }

    createVideoRoom(studyId,request,getCookie('accessToken'))
      .then((response) => {
        console.log(response);
        navigate(`/study/${studyId}/board/rooms`);
      })
      .catch((error) => setServerErrorMsg(error.error));
  };

  return (
    <form onSubmit={createRoomHandler}>
      <CreateRoomStyle>
        <div>
          <MuiTextField
            label="방 제목"
            value={roomname}
            onChange={changeRoomnameHandler}
            variant="outlined"
          />
        </div>
        <div>
          <MuiTextField
            type="password"
            label="방 비밀번호"
            value={pin}
            onChange={changePinHandler}
            variant="outlined"
          />
        </div>
        <button>생성</button>
        {serverErrorMsg !== '' && <p>{serverErrorMsg}</p>}
      </CreateRoomStyle>
    </form>
  );
};

export default CreateRoom;
