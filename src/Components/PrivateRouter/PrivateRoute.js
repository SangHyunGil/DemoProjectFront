import React, {useEffect} from 'react';
import {Navigate,useLocation} from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import {reLoginSuccess} from '../../reducers/users';
import { checkAccessToken} from '../../utils/jwt';

function PrivateRoute(props) {
    const location = useLocation();//현재 location 저장
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.users.isLogin);

    useEffect(() => {
        checkAccessToken(dispatch);
    },[isLogin]);

    return (
        <>
            {isLogin ? props.children : <Navigate to="/login" state={{from:location}} />} 
        </>
    )
}

export default PrivateRoute;
