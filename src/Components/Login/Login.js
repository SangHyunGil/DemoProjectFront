import React, {useEffect} from 'react';
import useInput from '../../hooks/useInput';
import { CircularProgress } from "@material-ui/core";
import './Login.scss';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
    loginRequest,
    clearLoginState,
  } from "../../reducers/users";
import {checkAccessToken} from '../../utils/jwt';

function Login() {
    let navigate = useNavigate();
    const [Email, onChangeEm] = useInput('');
    const [Password, onChangePw] = useInput('');
    const dispatch = useDispatch();
    const { loginLoading, loginDone, loginError } = useSelector(
        (state) => state.users
    );

    useEffect(() => {
        if (!loginDone) return;
        navigate("/", {replace: true});
        dispatch(clearLoginState());
    }, [loginDone]);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginRequest({
            email: Email,
            password: Password
        }));
    }

    return (
        <div>
            {loginError === "" ? null : <p> {loginError} </p>}
            <form className="lg-form" onSubmit={handleLogin}>
                <label htmlFor="ID">이메일</label>
                <input id="ID" name="ID" onChange={onChangeEm} type="text" required ></input>
                <label htmlFor="PW">비밀번호</label>
                <input id="PW" name="PW" onChange={onChangePw} type="password" required></input>
                {loginLoading ? (
                    <CircularProgress />
                    ) : (
                    <button type="submit">로그인</button>
                    )}
                <p>아이디가 없으세요? <Link to="/signUp">회원가입</Link></p>       
                <p>비밀번호를 잊어버리셨나요? <Link to="/signUp">비밀번호 찾기</Link> </p>
                <p>비밀번호를 잊어버리셨나요? <Link to="/temp">테스트</Link> </p>
            </form>
        </div>
    )   
}

export default Login;
