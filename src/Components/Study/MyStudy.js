import React, {useEffect,useState} from 'react';
import { useSelector } from "react-redux";
import {findUserBoard} from '../../Api/Api';
import {Link} from 'react-router-dom';

function MyStudy() {
    const id = useSelector((state) => state.users.id);
    const accessToken = useSelector((state) => state.users.accessToken);
    const [BoardInfo, setBoardInfo] = useState([]);

    useEffect(() => {
        findUserBoard(id,accessToken).then(res => {
            const {data: {boards}} = res.data;
            setBoardInfo(() => [...boards]);
        })
        .catch(err => {
            console.log(err);
        })
    },[])

    return (
        <React.Fragment>
            {BoardInfo.length === 0 && <div>스터디 게시판이 없습니다.</div>}
            {BoardInfo.map((c) => (
                <div key={c.boardId}>
                    <h1>제목: {c.title}</h1>
                    <p>토픽: {c.topic}</p>
                    <p>총 정원: {c.headCount}</p>
                    <p>가입한 인원: {c.joinCount}</p>
                    <p>모집 상태: {c.recruitState}</p>
                    <p>스터디 상태: {c.studyState}</p>
                    <Link to={`/profile/updateStudyInfo/${c.boardId}`}>수정하기</Link>
                    <Link to={`/study/${c.boardId}/articles`}>보러가기</Link>
                </div>
            ))}
        </React.Fragment>
    )
}

export default MyStudy;
