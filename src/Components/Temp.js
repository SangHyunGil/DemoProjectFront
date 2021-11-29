import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { getCookie } from '../utils/cookie';
import { loadInfoRequest, tokenRequest } from '../reducers/users';

const Temp = () => {
    const { isLogin, isChecked } = useSelector(
        (state) => state.users
    );
    let navigate = useNavigate();
    const dispatch = useDispatch();
    
    const goLoginPage = () => {
        navigate("/", {replace: false});
    }

    useEffect(() => {
        if (isChecked && !isLogin) {
            goLoginPage();
        }

    }, [isLogin, isLogin]);
    
    return (
        <div>
            <p>hello</p>
        </div>
    )
}

export default Temp;