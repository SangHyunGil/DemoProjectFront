import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerRequest, clearRegisterState } from "../../reducers/users";
import { useForm } from 'react-hook-form';
import styled from "styled-components";
import InputAdornment from "@mui/material/InputAdornment";
import { FormControl } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { RadioGroup } from "@mui/material";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Button from '@mui/material/Button';
import {motion} from "framer-motion";

const SignUpformStyle = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    margin: 0 auto;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 20px 0;
    @media (max-width: 1100px) {
      box-shadow: none;
    }
`;

const SignUpInputWrapper = styled(FormControl)`
    @media (max-width: 460px) {
      width: 75vw !important;
    }
`;

const SignUpButton = styled(motion.button)`
    border: 0;
    border-radius: 10px;
    padding: 10px 20px;
    background-color: #ffa500;
    color: white;
    font-weight: bold;
`;

const SignUpThumbnailInput = styled.input`
    display: none;
`;

function SignUp() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [Department, setDepartment] = useState("컴퓨터공학부");
  const [IsPasswordVisible, setIsPasswordVisible] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [previewImg, setPreviewImg] = useState('');
  const { register, handleSubmit, formState: {errors}, setValue } = useForm();

  const { id, email, registerDone, registerError, registerLoading } =
    useSelector((state) => state.users);

  useEffect(() => {
    console.log(id, email, registerDone);
    if (!registerDone) return;
    navigate("/signup/complete", { replace: false });
    dispatch(clearRegisterState());
  }, [registerDone]);

  const handleUpload = (e) => {
    const { files } = e.target;
    const reader = new FileReader();
    setThumbnail(files[0]);
    reader.onload = () => {
      setPreviewImg(reader.result);
    }
    reader.readAsDataURL(files[0]);
  }

  const handleSignUp = (data,e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("nickname", data.nickname);
    formData.append("department", Department);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    dispatch(registerRequest(formData));
    setValue('email', '');
    setValue('password', '');
    setValue('nickname', '');
  };

  const Depart = [
    { id: 0, val: "기계공학부" },
    { id: 1, val: "전기전자통신공학부" },
    { id: 2, val: "디자인,건축공학부" },
    { id: 3, val: "메카트로닉스공학부" },
    { id: 4, val: "산업경영학부" },
    { id: 5, val: "에너지신소재화학공학부" },
    { id: 6, val: "컴퓨터공학부" },
    {id: 7, val: "고용서비스정책학부"}
  ];

  const handleDepartMent = (e) => {
    setDepartment(e.target.value);
  };

  return (
    <div style={{margin:'5% 10%'}}>
      {registerError === "" ? null : <p> {registerError} </p>}
      <SignUpformStyle
        encType="multipart/form-data"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <SignUpInputWrapper variant="outlined" sx={{ m: 1, width: '50ch'}}>
          <InputLabel htmlFor="outlined-adornment-email">이메일</InputLabel>
          <OutlinedInput
            {...register("email",{required:'이메일을 입력해주세요'})}
            label="이메일"
            id="outlined-adornment-email"
            endAdornment={
              <InputAdornment position="end">@koreatech.ac.kr</InputAdornment>
            }
          />
          <p style={{color:'red',alignSelf: 'flex-start'}}>{errors?.email?.message}</p>
        </SignUpInputWrapper>
        <SignUpInputWrapper sx={{width: '50ch'}}>
          <InputLabel htmlFor="outlined-adornment-password">
            패스워드
          </InputLabel>
          <OutlinedInput
            {...register("password",{required:'패스워드를 입력해주세요',pattern: {value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, message: '비밀번호는 최소 8자리이면서 1개 이상의 알파벳, 숫자, 특수문자를 포함해야합니다.'} })}
            id="outlined-adornment-password"
            type={IsPasswordVisible ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setIsPasswordVisible(!IsPasswordVisible);
                  }}
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                  edge="end"
                >
                  {IsPasswordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <p style={{color:'red',alignSelf: 'flex-start'}}>{errors?.password?.message}</p>
        </SignUpInputWrapper>
        <SignUpInputWrapper sx={{ m: 1, width: '50ch'}}>
          <InputLabel htmlFor="outlined-adornment-nickname">닉네임</InputLabel>
          <OutlinedInput
            {...register("nickname",{required:'닉네임을 입력해주세요'})}
            id="outlined-adornment-nickname"
            label="닉네임"
          />
          <p style={{color:'red',alignSelf: 'flex-start'}}>{errors?.nickname?.message}</p>
        </SignUpInputWrapper>
        <SignUpInputWrapper component="fieldset" sx={{m:1, width: '50ch'}}>
          <FormLabel component="legend">학부</FormLabel>
          <RadioGroup
            row
            aria-label="학부"
            defaultValue="컴퓨터공학부"
            name="radio-buttons-group"
          >
            {Depart.map(x=>(
                <FormControlLabel key={x.id} value={x.val} onChange={handleDepartMent} control={<Radio />} label={x.val} />
            ))}
          </RadioGroup>
        </SignUpInputWrapper>
        {previewImg === '' ? null : <img src={previewImg} alt="preview" style={{width:'100px',height:'100px'}}/>}
        <label htmlFor="contained-button-file">
            <SignUpThumbnailInput accept="image/*" id="contained-button-file" name="thumbNailImg" type="file" onChange={handleUpload}/>
            <Button variant="contained" component="span" sx={{m:2}}>
                썸네일 이미지 선택
            </Button>
        </label>
        {registerLoading ? (
          <CircularProgress />
        ) : (
          <SignUpButton whileHover={{scale:1.1,cursor:'pointer'}} type="submit">회원가입</SignUpButton>
        )}
      </SignUpformStyle>
    </div>
  );
}

export default SignUp;
