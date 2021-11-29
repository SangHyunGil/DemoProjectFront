import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { getCookie, removeCookie } from '../utils/cookie';
import { loadInfoRequest, tokenRequest } from '../reducers/users';

const Temp = () => {
    const navigate = useNavigate();
    /*
    const { isLogin, isChecked } = useSelector(
        (state) => state.users
    );
    let navigate = useNavigate();
    const dispatch = useDispatch();*/
    /*
    const goLoginPage = () => {
        navigate("/", {replace: false});
    }

    useEffect(() => {
        if (isChecked && !isLogin) {
            goLoginPage();
        }

    }, [isLogin, isLogin]);
    */
    const LogOutHandler = () => {
        removeCookie('refreshToken');
        removeCookie('accessToken');
        navigate('/login');
    };
    return (
        <div>
            <p>hello</p>
            <button onClick={LogOutHandler}>로그아웃</button>
        </div>
    )
}

export default Temp;