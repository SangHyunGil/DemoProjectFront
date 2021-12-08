import React,{useEffect} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {logOut} from '../../reducers/users';
import {removeCookie} from '../../utils/cookie';

function Logout() {
    //const isLogin = useSelector(state => state.users.isLogin);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(logOut());
        removeCookie('refreshToken',{path:'/'});
        removeCookie('accessToken',{path:'/'});
        console.log('logout 성공');
    },[]);

    return (
        <Navigate to="/"/>
    )
}

export default Logout;