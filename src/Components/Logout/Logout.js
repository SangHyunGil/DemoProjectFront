import React,{useEffect} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {logOut} from '../../reducers/users';
import {removeCookie, getCookie} from '../../utils/cookie';
import { Cookies }  from "react-cookie";

function Logout() {
    //const isLogin = useSelector(state => state.users.isLogin);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cookies = new Cookies();
    useEffect(()=>{
        dispatch(logOut());
        cookies.remove('refreshToken', { path: '/' });
        cookies.remove('accessToken', { path: '/' });
    },[]);

    return (
        <Navigate to="/"/>
    )
}

export default Logout;