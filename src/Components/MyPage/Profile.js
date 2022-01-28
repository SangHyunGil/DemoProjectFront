import React, { useEffect, useState, forwardRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  clearChangeUserInfoState,
} from "../../reducers/users";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUserProfileInfo, updateProfileInfo } from "../../Api/Api";
import { FormControl } from '@mui/material';
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import { getCookie } from "../../utils/cookie";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TransitionUp = (props) => {
  return <Slide {...props} direction="up"/>;
};

const StyleProfileImgWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 10%;
  img {
    width: 100%;
  }
`;

const ProfileImgAddButton = styled.label`
  background-color: white;
  padding: 5px;
  border-radius: 50%;
  position: absolute;
  right: 0;
  bottom: 0;
  svg {
    margin: 0;
    &:hover {
      cursor: pointer;
      color: #0097e6;
      transition: color .3s ease-in-out;
    }
  }
`;

const ProfileFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileFormHeader = styled.header`
  display: flex;
  align-items: center;
  margin: 20px 0;
  padding: 10px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 100ch;
  justify-content: center;
`;

const ProfileFormMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100ch;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
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
  const [backGroundImg, setbackGroundImg] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [open, setOpen] = useState(false);
  const {register, handleSubmit, formState: {errors}, setValue} = useForm();
  const queryClient = useQueryClient();

  const { isLoading, data:myInfo } = useQuery(['loadMyInfo'],()=>getUserProfileInfo(id,getCookie('accessToken')),{
    select: (data) => data.data.data,
  });

  const updateProfileInfoMutation = useMutation(['updateProfileInfo',id], (data)=>updateProfileInfo(data,id,getCookie('accessToken')),{
    onSuccess: () => {
      queryClient.invalidateQueries(['loadMyInfo']);
      setOpen(true);
    }
  });

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

  useEffect(() => {
    if (!isLoading && myInfo) {
      //setValue('email', myInfo.email);
      setValue('nickname', myInfo.nickname);
      setValue('department', myInfo.department);
    }
  },[myInfo, setValue, isLoading]);

  const handleProfile = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append('nickname', data.nickname);
    formData.append('department', data.department);
    formData.append('email',myInfo.email);
    if (thumbnail) {
      formData.append('profileImg', thumbnail);
    }
    updateProfileInfoMutation.mutate(formData);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleUpload = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setbackGroundImg(e.target.result);
        };
        reader.readAsDataURL(files[0]);
        setThumbnail(files[0]);
    }
};

  return (
    <section style={{height: 'calc(100% - 108px)'}}>
      {changeUserInfoError === "" ? null : <p> {changeUserInfoError} </p>}
      <Snackbar anchorOrigin={{ vertical: 'top',horizontal: 'right',}} TransitionComponent={TransitionUp} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} >
          스터디 수정에 성공했습니다!.
        </Alert>
      </Snackbar>
      <ProfileFormStyle onSubmit={handleSubmit(handleProfile)}>
        <ProfileFormHeader>
          <StyleProfileImgWrapper>
            <img src={myInfo?.profileImgUrl} alt="profile img"/>
            <ProfileImgAddButton htmlFor="contained-button-file">
              <input style={{display:'none'}} accept="image/*" id="contained-button-file" name="thumbNailImg" type="file" onChange={handleUpload}/>
              <AddPhotoAlternateIcon sx={{m:2}} />
            </ProfileImgAddButton>
          </StyleProfileImgWrapper>
          <FormControl disabled sx={{width: '40ch',m:1}}>
            <InputLabel htmlFor="outlined-adornment-email">이메일</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              label="이메일"
              value={`${myInfo?.email}@koreatech.ac.kr`}
            />
          </FormControl>
        </ProfileFormHeader>
        <ProfileFormMain>
          <FormControl sx={{width:'50ch', m:2}}>
            <InputLabel htmlFor="outlined-adornment-nickname">닉네임</InputLabel>
            <OutlinedInput
              {...register('nickname',{value:' '})}
              id="outlined-adornment-nickname"
              label="닉네임"
            />
          </FormControl>
          <FormControl sx={{width:'50ch', m:2}}>
            <select {...register('department')}>
              <option value="기계공학부">기계공학부</option>
              <option value="전기전자통신공학부">전기전자통신공학부</option>
              <option value="디자인,건축공학부">디자인,건축공학부</option>
              <option value="메카트로닉스공학부">메카트로닉스공학부</option>
              <option value="산업경영학부">산업경영학부</option>
              <option value="에너지신소재화학공학부">에너지신소재화학공학부</option>
              <option value="컴퓨터공학부">컴퓨터공학부</option>
            </select>
          </FormControl>
        </ProfileFormMain>
        <button type="submit">수정하기</button>
      </ProfileFormStyle>
    </section>
  );
};

export default Profile;
