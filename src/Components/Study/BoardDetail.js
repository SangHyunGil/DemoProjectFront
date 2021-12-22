import React, {useEffect, useState} from 'react'; 
import { findBoard, join, findUserBoard,getBoardCategory } from '../../Api/Api';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {updateStudyIds} from '../../reducers/users';
import {useQuery} from 'react-query';
import {useParams} from 'react-router-dom';
import {getCookie} from '../../utils/cookie';

function BoardDetail ({ boardId }) { 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [headCount, setHeadCount] = useState('');
    const [joinCount, setjoinCount] = useState('');
    const [studyState, setStudyState] = useState("");
    const [recruitState, setRecruitState] = useState("");
    const [content, setContent] = useState("");
    const [Members, setMembers] = useState([]);
    const [studyId, setstudyId] = useState("");
    const { isChecked, isLogin, id, accessToken,studyInfos, nickname } = useSelector((state) => state.users);
    const [IsAlreadyJoined, setIsAlreadyJoined] = useState(false);
    const [isClosed, setisClosed] = useState(false);
    const {data:board} = useQuery(['board', params.boardId], ()=>getBoardCategory(params.boardId,getCookie('accessToken')), {
        select: (x) => x.data.data,
        onError: (err) => console.log(err),
        enabled: isLogin,
    });

    useEffect(() => {
        const getBoard = async () => {
                await findBoard(boardId)
                .then(response => {setTitle(response.data.data.title);
                            setTopic(response.data.data.topic);
                            setStudyState(response.data.data.studyState);
                            setRecruitState(response.data.data.recruitState);
                const {data: {studyId,content,studyMembers,joinCount,headCount}} = response.data;
                //console.log(response.data);
                setstudyId(studyId);
                setContent(content);
                //setStudyBoardCategories([...studyBoards]);
                setMembers([...studyMembers]);
                setjoinCount(joinCount);
                setHeadCount(headCount);
                //console.log(studyIds,headCount);
                //console.log(studyInfos);
                studyInfos.map(studyInfo => {
                    //console.log(studyInfo);
                    if(studyInfo.studyId === studyId){
                        setIsAlreadyJoined(true);
                    }
                });
                //console.log(IsAlreadyJoined);
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
    },[isChecked,isClosed,isLogin,boardId,IsAlreadyJoined,studyInfos]);

    const BoardDetailHandler = (e) => {
        if (isChecked && isLogin) {
            if (e.target.name === "Join") {
                join(boardId, id, accessToken)
                    .then(response => {
                        console.log(response.data);
                        const {data: {studyInfos}} = response.data;
                        dispatch(updateStudyIds(...studyInfos))
                        navigate("/study")} )
                    .catch(error => console.log(error));
                return;
            }
            else if (e.target.name === "Direct") {
                navigate(`/study/${studyId}/board/${board[0].studyBoardId}/articles`);
                return;
            }
        }
        navigate("/login")
    };

    return ( 
        <>
            <h2>{title}</h2>
            <h3>{topic}</h3>
            <h4>{joinCount}/{headCount}</h4>
            <h4>{studyState}</h4>
            <h4>{recruitState}</h4>
            <h4>{content}</h4>
            {Members.map((m) => (<p key={m}>{m}</p>))}
            {isLogin ? (isClosed? (<h3>마감되었습니다!</h3>) : (IsAlreadyJoined? <button name='Direct' onClick={BoardDetailHandler}>바로가기</button>: 
            <button onClick={BoardDetailHandler} name='Join' >신청하기</button>)) : <h3>로그인 해주세요!</h3> }
        </> 
    ); 
} 
        
export default BoardDetail;