import React, {useEffect, useState} from 'react'; 
import { findBoard, join } from '../../Api/Api';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function BoardDetail ({ boardId }) { 
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [headCount, setHeadCount] = useState("");
    const [studyState, setStudyState] = useState("");
    const [recruitState, setRecruitState] = useState("");
    const { isChecked, isLogin, id, accessToken } = useSelector((state) => state.users);

    useEffect(() => {
        findBoard(boardId)
        .then(response => {setTitle(response.data.data.title);
                           setTopic(response.data.data.topic);
                           setHeadCount(response.data.data.headCount);
                           setStudyState(response.data.data.studyState);
                           setRecruitState(response.data.data.recruitState);
        })
        .catch(error => console.log(error));
    }, [])

    const BoardDetailHandler = () => {
        if (isChecked && isLogin) {
            join(boardId, id, accessToken)
                .then(response => navigate("/study"))
                .catch(error => console.log(error));
            return;
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
            <button onClick={BoardDetailHandler}>신청하기</button>
        </div> 
    ); 
} 
        
export default BoardDetail;