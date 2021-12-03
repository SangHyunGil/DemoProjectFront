import React, {useEffect} from 'react';
import { useNavigate } from 'react-router';
import { CircularProgress } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../../hooks/useInput';

import {
    clearFindPasswordState,
    findPasswordRequest
  } from "../../reducers/users";

function SignUp() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [Email, onChangeEm] = useInput('');

    const { findPasswordLoading, findPasswordDone, findPasswordError } = useSelector(
        (state) => state.users
    );

    useEffect(() => {
        if (!findPasswordDone) return;
        navigate("/signup/complete", {replace: false});
        dispatch(clearFindPasswordState());
    }, [findPasswordDone]);

    const handleFindpassword = (e) => {
        e.preventDefault();
        dispatch(
            findPasswordRequest({
                email : Email,
            })
        )
    };

    return (
        <div>
            {findPasswordError === "" ? null : <p> {findPasswordError} </p>}
            <form onSubmit={handleFindpassword}>
                <input name="Email" onChange={onChangeEm} placeholder="이메일" type="text" required></input>
                {findPasswordLoading ? (
                <CircularProgress />
                ) : (
                <button type="submit">이메일 인증</button>
                )}
            </form>
        </div>
    )
}

export default SignUp;