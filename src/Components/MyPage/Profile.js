import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useInput from "../../hooks/useInput";
import {
  changeUserInfoRequest,
  clearChangeUserInfoState,
} from "../../reducers/users";
import { Input } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { FormControl } from '@mui/material';
import styled from 'styled-components';

const ProfileForm = styled(FormControl)`
    display: flex;
    flex-direction: column;
`;


const Profile = () => {
  const {
    id,
    email,
    nickname,
    accessToken,
    department,
    isChecked,
    isLogin,
    changeUserInfoDone,
    changeUserInfoError,
  } = useSelector((state) => state.users);
  let navigate = useNavigate();
  const [Email, onChangeEm] = useInput(email);
  const [Nickname, onChangeNi] = useInput(nickname);
  const [Department, onChangeDe] = useInput(department);

  const dispatch = useDispatch();

  const goLoginPage = () => {
    navigate("/", { replace: false });
  };

  useEffect(() => {
    if (isChecked && !isLogin) {
      goLoginPage();
    }
  }, [isLogin, isChecked]);

  useEffect(() => {
    console.log(changeUserInfoDone);
    if (!changeUserInfoDone) {
      return;
    }
    navigate("/", { replace: true });
    dispatch(clearChangeUserInfoState());
  }, [changeUserInfoDone]);

  const handleProfile = (e) => {
    e.preventDefault();
    dispatch(
      changeUserInfoRequest({
        id: id,
        email: Email,
        nickname: Nickname,
        department: Department,
        accessToken: accessToken,
      })
    );
  };

  return (
    <div>
      {changeUserInfoError === "" ? null : <p> {changeUserInfoError} </p>}
      <Box>
        <ProfileForm onSubmit={handleProfile}>
          <label htmlFor="Email">이메일</label>
          <Input
            name="Email"
            defaultValue={`${email}@koreatech.ac.kr`}
            onChange={onChangeEm}
            type="text"
            required
            disabled
          ></Input>

          <label htmlFor="Nickname">닉네임</label>
          <Input
            name="Nickname"
            defaultValue={nickname}
            onChange={onChangeNi}
            type="text"
            required
          ></Input>

          <label htmlFor="Department">학과</label>
          <Input
            name="Department"
            defaultValue={department}
            onChange={onChangeDe}
            type="text"
            required
          ></Input>

          <Input type="file" accept="image/png, image/jpeg"></Input>

          <button type="submit">수정하기</button>
        </ProfileForm>
      </Box>
    </div>
  );
};

export default Profile;
