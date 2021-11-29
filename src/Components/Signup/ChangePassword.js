import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import useInput from '../../hooks/useInput';
import {
    emailAuthRequest,
    changePasswordRequest
  } from "../../reducers/users";
import { useNavigate } from "react-router-dom";

function EmailAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { emailAuthError, emailAuthSuccess,
        changePasswordError, changePasswordDone, changePasswordLoading } = useSelector(
        (state) => state.users
      );
      
    let [searchParams, setSearchParams] = useSearchParams();
    const [Password, onChangePw] = useInput('');
    const email = searchParams.get("email");
    const authCode = searchParams.get("authCode");

    useEffect(() => {
        if (!changePasswordDone) {
            dispatch(
                emailAuthRequest({
                    email : email,
                    authCode : authCode,
                    redisKey : "PASSWORD"
                })
            );
        }
      }, []);



    const handleChangepassword = () => {
        dispatch(
            changePasswordRequest({
                email : email,
                password : Password
            })
        )

        navigate("/login");
    }

    if (!emailAuthSuccess) {
        return (
            <div>
                <p>{emailAuthError}</p>
            </div>
        ) 
    } else {
        return (
            <div>
                {changePasswordError === "" ? null : <p> {changePasswordError} </p>}
                <form onSubmit={handleChangepassword}>
                    <input name="Password" onChange={onChangePw} placeholder="비밀번호" type="password" required></input>
                        {changePasswordLoading ? (
                        <CircularProgress />
                        ) : (
                        <button type="submit">비밀번호 변경</button>
                        )}
                </form>
            </div>
        )
    }

}

export default EmailAuth;
