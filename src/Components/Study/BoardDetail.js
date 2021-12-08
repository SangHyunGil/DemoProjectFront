import React, {useEffect, useState} from 'react'; 
import { findBoard, join, findUserBoard } from '../../Api/Api';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {Link} from 'react-router-dom';

function BoardDetail ({ boardId }) { 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [headCount, setHeadCount] = useState('');
    const [joinCount, setjoinCount] = useState('');
    const [studyState, setStudyState] = useState("");
    const [recruitState, setRecruitState] = useState("");
    const [content, setContent] = useState("");
    const [Members, setMembers] = useState([]);
    const [studyId, setstudyId] = useState("");
    const [StudyBoardCategories, setStudyBoardCategories] = useState([]);
    const { isChecked, isLogin, id, accessToken, studyIds, nickname } = useSelector((state) => state.users);
    const [IsAlreadyJoined, setIsAlreadyJoined] = useState(false);
    const [isClosed, setisClosed] = useState(false);

    useEffect(() => {
        const getBoard = async () => {
                await findBoard(boardId)
                .then(response => {setTitle(response.data.data.title);
                            setTopic(response.data.data.topic);
                            setStudyState(response.data.data.studyState);
                            setRecruitState(response.data.data.recruitState);
                const {data: {studyId,content,studyBoards,studyMembers,joinCount,headCount}} = response.data;
                console.log(response.data);
                setstudyId(studyId);
                setContent(content);
                setStudyBoardCategories([...studyBoards]);
                setMembers([...studyMembers]);
                setjoinCount(joinCount);
                setHeadCount(headCount);
                console.log(studyIds,headCount);
                if (studyIds.includes(studyId)) {
                    console.log("참여중");
                    setIsAlreadyJoined(true);
                }
                if (Number(headCount) === Number(joinCount) && !IsAlreadyJoined) {
                    setisClosed(true);
                } else {
                    setisClosed(false);
                }
                console.log(isClosed);
                })  
                .catch(error => console.log(error));
        }
        if(isChecked) {
            getBoard();
            
            }
    },[isChecked,isClosed]);

    const BoardDetailHandler = (e) => {
        if (isChecked && isLogin) {
            if (e.target.name === "Join") {
                join(boardId, id, accessToken)
                    .then(response => navigate("/study"))
                    .catch(error => console.log(error));
                return;
            }
            else if (e.target.name === "Direct") {
                navigate(`/study/${studyId}/board/${StudyBoardCategories[0]}/articles`);
                return;
            }
        }
        navigate("/login")
    };

    return ( 
        <div>
            <input name="title" defaultValue ={`${title}`} type="text" disabled></input>
            <input name="topic" defaultValue ={`${topic}`} type="text" disabled></input>
            <input name="headCount" defaultValue ={`${headCount}`} type="text" disabled></input>
            <input name="studyState" defaultValue ={`${studyState}`} type="text" disabled></input>
            <input name="recruitState" defaultValue ={`${recruitState}`} type="text" disabled></input>
            <input name="content" defaultValue ={`${content}`} type="text" disabled></input>
            {Members.map((m) => (<p key={m}>{m}</p>))}
            {isClosed? (<h3>마감되었습니다!</h3>) : (IsAlreadyJoined? <button name='Direct' onClick={BoardDetailHandler}>바로가기</button>: 
            <button onClick={BoardDetailHandler} name='Join' >신청하기</button>) }
        </div> 
    ); 
} 
        
export default BoardDetail;