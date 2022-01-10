import React, {useEffect, useState} from 'react';
import useInput from '../../hooks/useInput';
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    registerRequest,
    clearRegisterState,
  } from "../../reducers/users";

function SignUp() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [Email, onChangeEm] = useInput('');
    const [Password, onChangePw] = useInput('');
    const [Nickname, onChangeNi] = useInput('');
    const [Department, setDepartment] = useState('컴퓨터공학부');

    const { id, email, registerDone, registerError, registerLoading } = useSelector(
        (state) => state.users
    );

    useEffect(() => {
        console.log(id, email, registerDone);
        if (!registerDone) return;
        navigate("/signup/complete", {replace: false});
        dispatch(clearRegisterState());
    }, [registerDone]);

    const handleSignUp = (e) => {
        e.preventDefault();
        dispatch(
            registerRequest({
                email : Email,
                password : Password,
                nickname : Nickname,
                department : Department,
            })
        )
    };

    const Depart = [
        {id:0, val: '기계공학부'}, {id:1, val: '전기전자통신공학부'}, {id:2, val: '디자인,건축공학부'}, {id:3, val: '메카트로닉스공학부'}
        , {id:4, val: '산업경영학부'}, {id:5, val: '에너지신소재화학공학부'},{id:6, val:'컴퓨터공학부'}
    ];

    const handleDepartMent = (e) => {
        setDepartment(e.target.value);
    };

    return (
        <div>
            {registerError === "" ? null : <p> {registerError} </p>}
            <form onSubmit={handleSignUp}>
                <input name="Email" onChange={onChangeEm} placeholder="이메일" type="text" required></input>
                <input name="Password" onChange={onChangePw} placeholder="비밀번호" type="password" required></input>
                <input name="Nickname" onChange={onChangeNi} placeholder="닉네임" type="text"></input>
                <div>
                    {Depart.map((x) =>
                    <React.Fragment key={x.id}>
                        <input
                        id = {x.val}
                        name={x.val}
                        type="radio" 
                        value={x.val} 
                        checked={Department===x.val} 
                        onChange={handleDepartMent} />
                        <label htmlFor={x.val}>{x.val}</label>
                    </React.Fragment>)}
                </div>
                {registerLoading ? (
                <CircularProgress />
                ) : (
                <button type="submit">회원가입</button>
                )}
            </form>
        </div>
    )
}

export default SignUp;
