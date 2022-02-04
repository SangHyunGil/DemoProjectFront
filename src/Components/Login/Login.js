import React, { useEffect } from "react";
import useInput from "../../hooks/useInput";
import { CircularProgress } from "@material-ui/core";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginRequest, clearLoginState } from "../../reducers/users";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import { useForm } from "react-hook-form";
import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import styled from "styled-components";

const LoginWrapper = styled.div`
  height: calc(100vh - 66px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginFormWrapper = styled.div`
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 4rem 2rem;
  @media (max-width: 560px) {
      box-shadow: none;
      width: 80vw;
  }
`;

const LoginFormHeader = styled.header`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  align-items: center;
`;

const LoginformStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginButton = styled(Button)`
    padding: 0 18px;
    color: #0049AF;
`;

const LoginTextStyle = styled.footer`
  display: flex;
  justify-content: center;
  a {
    color: black;
    text-decoration: none;
    margin-left: 1ch;
  }
`;

function Login() {
  const dispatch = useDispatch();
  const { loginLoading, loginDone, loginError } = useSelector(
    (state) => state.users
  );
  const { register, handleSubmit, formState: {errors}} = useForm();

  useEffect(() => {
    if (!loginDone) return;
    window.location.replace("/");
    dispatch(clearLoginState());
  }, [loginDone]);

  const handleLogin = (data) => {
    dispatch(
      loginRequest({
        email: data.email,
        password: data.password,
      })
    );
  };

  return (
    <LoginWrapper>
      <LoginFormWrapper>
        <LoginFormHeader>
          <h2>로그인</h2>
          <p>원활한 활동을 위해서는 로그인이 필요합니다!</p>
        </LoginFormHeader>
        <LoginformStyle onSubmit={handleSubmit(handleLogin)}>
          <FormControl sx={{ width: "50ch", maxWidth:'80vw', m: 1 }}>
            <InputLabel htmlFor="component-outlined">Email</InputLabel>
            <OutlinedInput
              id="component-outlined"
              {...register('email',{required: 'email이 필요해요!'})}
              label="Email"
              endAdornment={
                <InputAdornment position="end">@koreatech.ac.kr</InputAdornment>
              }
            />
            <FormHelperText sx={{color:'red'}}>{errors?.email?.message}</FormHelperText>
          </FormControl>
          <FormControl sx={{ width: "50ch",maxWidth:'80vw', m: 1 }}>
            <InputLabel htmlFor="component-outlined">비밀번호</InputLabel>
            <OutlinedInput
              id="component-outlined"
              {...register('password',{required: '비밀번호를 입력해주세요!'})}
              label="비밀번호"
              type="password"
            />
            <FormHelperText sx={{color:'red'}}>{errors?.password?.message}</FormHelperText>
          </FormControl>
          {loginError === "" ? null : (
            <p style={{ color: "red" }}> {loginError} </p>
          )}
          {loginLoading ? (
            <CircularProgress />
          ) : (
            <LoginButton
              type="submit"
              variant="contained"
              sx={{width: "55ch",maxWidth:'80vw',m:1}}
              startIcon={<LoginIcon />}
            >
              로그인
            </LoginButton>
          )}
          
        </LoginformStyle>
        <LoginTextStyle>
            <Link to="/signup">회원가입</Link>
            <Link to="/signup/findpassword">비밀번호 찾기</Link>
            <Link to="/">메인페이지</Link>
        </LoginTextStyle>
      </LoginFormWrapper>
    </LoginWrapper>
  );
}

export default Login;
