import React, {useEffect} from 'react';
import {useNavigate, Link, useParams } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
//import {reLoginSuccess} from '../../reducers/users';
import { checkAccessToken} from '../../utils/jwt';
import Modal from '../Modal/Modal';
import { useQuery } from 'react-query';
import { findBoard } from '../../Api/Api';
import { getCookie } from '../../utils/cookie';

function PrivateRoute(props) {
    //const location = useLocation();//현재 location 저장
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.users.isLogin);
    const isChecked = useSelector(state => state.users.isChecked);
    const navigate = useNavigate();
    const params = useParams();
    
    const {data} = useQuery(['MembersOfStudy',params.studyId],()=>findBoard(params.studyId,getCookie('accessToken')),{
        enabled: !!params.studyId
    });

    useEffect(() => {
        if (!isLogin) {
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
            message={<p><Link to="/login">로그인</Link>이 필요한 서비스 입니다.</p>} />) }
        </>
    )
}

export default PrivateRoute;