import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import useInput from '../../hooks/useInput';
import { CircularProgress } from "@material-ui/core";
import { changeUserInfoRequest, clearChangeUserInfoState } from '../../reducers/users';

const Profile = () => {
    const { id, email, nickname, accessToken,
            department, isChecked, isLogin,
            changeUserInfoDone, changeUserInfoError } = useSelector(
        (state) => state.users
    );
    let navigate = useNavigate();
    const [Email, onChangeEm] = useInput(email);
    const [Nickname, onChangeNi] = useInput(nickname);
    const [Department, onChangeDe] = useInput(department);

    const dispatch = useDispatch();
    
    const goLoginPage = () => {
        navigate("/", {replace: false});
    }

    useEffect(() => {
        if (isChecked && !isLogin) {
            goLoginPage();
        }

    }, [isLogin, isChecked]);
    
    useEffect(() => {
        console.log(changeUserInfoDone);
        if (!changeUserInfoDone) {
            return;
        }
        navigate("/", {replace: true});
        dispatch(clearChangeUserInfoState());
    }, [changeUserInfoDone])

    const handleProfile = (e) => {
        e.preventDefault();
        dispatch(changeUserInfoRequest({
            id : id,
            email : Email,
            nickname : Nickname,
            department : Department,
            accessToken : accessToken
        }));
    }

    return (
        <div>
            {changeUserInfoError === "" ? null : <p> {changeUserInfoError} </p>}
            <form onSubmit={handleProfile}>
                <label htmlFor="Email">이메일</label>
                <input name="Email" defaultValue ={`${email}@koreatech.ac.kr`} onChange={onChangeEm} type="text" required disabled></input>

                <label htmlFor="Nickname">닉네임</label>
                <input name="Nickname" defaultValue ={nickname} onChange={onChangeNi} type="text" required ></input>

                <label htmlFor="Department">학과</label>
                <input name="Department" defaultValue ={department} onChange={onChangeDe} type="text" required ></input>
                <button type="submit">수정하기</button>
            </form>
        </div>
    )
}

export default Profile;