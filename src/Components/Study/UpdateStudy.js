import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import {findBoard} from '../../Api/Api';
//import useInput from '../../Hooks/useInput';

function UpdateStudy() {
    const params = useParams();
    const [BoardRoomInfo, setBoardRoomInfo] = useState({});

    useEffect(() => {
        findBoard(params.id).then(res => {
            const {data: {data}} = res;
            //console.log(res.data,data);
            setBoardRoomInfo(data);
        })
        .catch(err => {
            console.log(err);
        });
    },[]);

    const UpdateSubmitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <h1>수정 페이지</h1>
            <form onSubmit={UpdateSubmitHandler}>
                <input value={BoardRoomInfo.title} />
                <input value={BoardRoomInfo.topic} />
                <input value={BoardRoomInfo.headCount} />
                <input value={BoardRoomInfo.joinCount} />
                <input value={BoardRoomInfo.recruitState} />
                <input value={BoardRoomInfo.recruitState} />
                <button type="submit">수정</button>
            </form>
        </div>
    )
}

export default UpdateStudy;
