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
    const { isChecked, isLogin, id, accessToken,studyInfos} = useSelector((state) => state.users);
    const [IsAlreadyJoined, setIsAlreadyJoined] = useState(false);
    const [isClosed, setisClosed] = useState(false);
    const {data:board} = useQuery(['board', params.boardId], ()=>getBoardCategory(params.boardId,getCookie('accessToken')), {
        select: (x) => x.data.data,
        onError: (err) => console.log(err),
        enabled: isLogin,
    });
    const {data:BoardContent} = useQuery(['boardContent', params.boardId], ()=>findBoard(params.boardId,getCookie('accessToken')), {
        select: (x) => x.data.data,
        onSuccess: () => {
            studyInfos.forEach(element => {
                if (element.studyId+'' === params.boardId) {
                    setIsAlreadyJoined(true);
                }
            });
            (Number(BoardContent?.headCount) === Number(BoardContent?.joinCount) && !IsAlreadyJoined)? setisClosed(true): setisClosed(false);
        }
    });

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
                navigate(`/study/${params.boardId}/board/${board[0].studyBoardId}/articles`);
                return;
            }
        }
        navigate("/login")
    };

    return ( 
        <>
            <h2>{BoardContent?.title}</h2>
            <h3>{BoardContent?.topic}</h3>
            <h4>{BoardContent?.joinCount}/{BoardContent?.headCount}</h4>
            <h4>{BoardContent?.studyState}</h4>
            <h4>{BoardContent?.recruitState}</h4>
            <h4>{BoardContent?.content}</h4>
            <p></p>
            {BoardContent?.studyMembers?.map((m) => (<p key={m}>{m}</p>))}
            {isLogin ? (isClosed? (<h3>마감되었습니다!</h3>) : (IsAlreadyJoined? <button name='Direct' onClick={BoardDetailHandler}>바로가기</button>: 
            <button onClick={BoardDetailHandler} name='Join' >신청하기</button>)) : <h3>로그인 해주세요!</h3> }
        </> 
    ); 
} 
        
export default BoardDetail;