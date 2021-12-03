import React, {useEffect} from 'react';
import {Navigate,useLocation, useNavigate, Link} from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
//import {reLoginSuccess} from '../../reducers/users';
import { checkAccessToken} from '../../utils/jwt';
import Modal from '../Modal/Modal';

function PrivateRoute(props) {
    //const location = useLocation();//현재 location 저장
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.users.isLogin);
    const isChecked = useSelector(state => state.users.isChecked);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(isLogin);
        console.log('isChecked '+ isChecked);
        if (!isLogin) {
            console.log('로그인 안되어있음');
            //navigate('/login', {state: {from: location}});
            checkAccessToken(dispatch);
        }
    },[isLogin]);

    const ModalErrorHandler = () => {
        navigate('/');
    };

    return (
        <>
            {isChecked && (isLogin? props.children: 
            <Modal title={<p>로그인 필요 서비스</p>} ModalHandler={ModalErrorHandler}
            message={<p><Link to="/login">로그인</Link>이 필요한 서비스 입니다.</p>}  />) }
        </>
    )
}

export default PrivateRoute;