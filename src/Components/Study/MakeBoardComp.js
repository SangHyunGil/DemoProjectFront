import React, { useState } from "react";
import { createBoard } from "../../Api/Api";
import useInput from "../../hooks/useInput";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const MakeRoomComp = () => {
    const navigate = useNavigate();
    const [title, onChangeTitle] = useInput("");
    const [topic, onChangeTopic] = useInput("");
    const [headCount, onChangeHeadCount] = useInput("");
    const [studyState, setStudyState] = useState('PREPARE');
    const [recruitState, setRecruitState] = useState('PROCEED');
    const { id, accessToken } = useSelector((state) => state.users);

    const study = [
        {id:0, val: "PREPARE", text: '스터디 준비 중'}, {id:1, val: "STUDYING", text: '스터디 진행 중'}, 
        {id:2, val: "FINISH", text: '스터디 종료'}
    ];

    const recruit = [
        {id:0, val: "PROCEED", text: '모집 중'}, {id:1, val: "END", text: '모집 마감'}
    ];

    const handleStudyState = (e) => {
        setStudyState(e.target.value);
    };

    const handleRecruitState = (e) => {
        setRecruitState(e.target.value);
    };

    const onCreateBoard = (e) => {
        e.preventDefault();
        createBoard(title, topic, headCount, studyState, recruitState, id, accessToken)
            .then(response => {navigate("/study")})
            .catch(error => console.log(error));
    }

    return (
        <div>
            <form onSubmit={onCreateBoard}>
                <label htmlFor="title">스터디 이름</label>
                <input id="title" value={title} onChange={onChangeTitle}></input> <b />
                <label htmlFor="topic">주제</label>
                <input id="topic" value={topic} onChange={onChangeTopic}></input> <b />
                <label htmlFor="headCount">인원수</label>
                <input id="headCount" value={headCount} onChange={onChangeHeadCount}></input> <b />
                <label htmlFor="studyState">스터디 상태</label>
                <div>
                    {study.map((x) =>
                    <React.Fragment key={x.id}>
                        <input
                        id = {x.val}
                        name={x.val}
                        type="radio" 
                        value={x.val} 
                        checked={studyState===x.val} 
                        onChange={handleStudyState} />
                        <label htmlFor={x.val}>{x.text}</label>
                    </React.Fragment>)}
                </div> <b />
                <label htmlFor="recruitState">모집 상태</label>
                <div>
                    {recruit.map((x) =>
                    <React.Fragment key={x.id}>
                        <input
                        id = {x.val}
                        name={x.val}
                        type="radio" 
                        value={x.val} 
                        checked={recruitState===x.val} 
                        onChange={handleRecruitState} />
                        <label htmlFor={x.val}>{x.text}</label>
                    </React.Fragment>)}
                </div> <b />
                <button type="submit">개설</button>
            </form>
        </div>
    )
}

export default MakeRoomComp;