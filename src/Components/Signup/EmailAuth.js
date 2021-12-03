import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Link } from "@material-ui/core";
import {
    emailAuthRequest
  } from "../../reducers/users";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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
            <div>
                <p>{emailAuthError}</p>
                <button onClick={reSend}>메일 재전송</button>
            </div>
        ) 
    } else {
        return (
            <div>
                <p>인증이 완료되었습니다.</p>
                <Link href="/login">
                    <button>로그인하러 가기</button>
                </Link>
            </div>
        )
    }
}

export default EmailAuth;
