import React, {useEffect, useState} from 'react'; 
import { findBoard } from '../../Api/Api';

function BoardDetail ({ boardId }) { 
    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [headCount, setHeadCount] = useState("");
    const [studyState, setStudyState] = useState("");
    const [recruitState, setRecruitState] = useState("");

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

    return ( 
        <div>
            <input name="title" defaultValue ={`${title}`} type="text" disabled></input>
            <input name="topic" defaultValue ={`${topic}`} type="text" disabled></input>
            <input name="headCount" defaultValue ={`${headCount}`} type="text" disabled></input>
            <input name="studyState" defaultValue ={`${studyState}`} type="text" disabled></input>
            <input name="recruitState" defaultValue ={`${recruitState}`} type="text" disabled></input>
        </div> 
    ); 
} 
        
export default BoardDetail;