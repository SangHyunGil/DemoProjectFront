import React,{useEffect} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {logOut} from '../../reducers/users';
import {removeCookie} from '../../utils/cookie';

function Logout() {
    //const isLogin = useSelector(state => state.users.isLogin);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(logOut());
        removeCookie('refreshToken');
        removeCookie('accessToken');
        localStorage.setItem('logout',true);
        navigate('/login');
    },[]);

    return (
        <Navigate to="/login"/>
    )
}

export default Logout;