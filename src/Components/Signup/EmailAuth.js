import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Link } from "@material-ui/core";
import {
    emailAuthRequest
  } from "../../reducers/users";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';

const AuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10rem;
    font-size: 1.6rem;
    font-family: 'NEXON Lv2 Gothic', sans-serif;
    img {
        margin-bottom: 1rem;
    }
    a {
        text-decoration: none;
    }
    button {
        margin-top: 1rem;
        border: 0;
        border-radius: 5px;
        background-color: #ffc107;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        padding: 0.5rem 1rem;
        
        &:hover {
            cursor: pointer;
        }
    }
`;

function EmailAuth() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { emailAuthError, emailAuthSuccess } = useSelector(
        (state) => state.users
      );

    let [searchParams, setSearchParams] = useSearchParams();
    const email = searchParams.get("email");
    const authCode = searchParams.get("authCode");

    useEffect(() => {
        dispatch(
            emailAuthRequest({
                email : email,
                authCode : authCode,
                redisKey : "VERIFY"
            })
        );
      }, []);

    const reSend = () => {
        axios.post("/sign/email", {email : email, redisKey : "VERIFY"})
        navigate("/", {replace: true});
    }

    if (!emailAuthSuccess) {
        return (
            <AuthContainer>
                <img src="/AuthImg/failed.png" alt="fail" /> 
                <p>{emailAuthError}</p>
                <button onClick={reSend}>메일 재전송</button>
            </AuthContainer>
        ) 
    } else {
        return (
            <AuthContainer>
                <img src="/AuthImg/cheers.png" alt="success" />
                <p>인증이 완료되었습니다.</p>
                <Link href="/login">
                    <button>로그인하러 가기</button>
                </Link>
            </AuthContainer>
        )
    }
}

export default EmailAuth;
