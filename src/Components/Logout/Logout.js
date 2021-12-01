import React,{useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {logOut} from '../../reducers/users';
import {removeCookie} from '../../utils/cookie';

function Logout() {
    const isLogin = useSelector(state => state.users.isLogin);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(logOut());
        removeCookie('refreshToken');
        removeCookie('accessToken');
        localStorage.removeItem('persist:root');
        console.log(isLogin);
    },[]);

    return (
        <Navigate to="/login"/>
    )
}

export default Logout;
