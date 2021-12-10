import React, {useEffect,useState} from 'react';
import { useSelector } from "react-redux";
import {getStudyInfo} from '../../Api/Api';
import {Link} from 'react-router-dom';
import Card from '../Card/Card';

function MyStudy() {
    const studyInfos = useSelector((state) => state.users.studyInfos);
    const [BoardInfo, setBoardInfo] = useState([]);
    const [HasBoard, setHasBoard] = useState(false);

    useEffect(() => {
        console.log(studyInfos.length,BoardInfo.length);
        if (studyInfos.length !== BoardInfo.length && studyInfos.length !== 0) {
            studyInfos.map((studyInfo) => {
                getStudyInfo(studyInfo.studyId).then((res) => {
                    const {data:{data}} = res;
                    setBoardInfo((prev)=> [...prev, data]);
                    setHasBoard(true);
                })
            })
        }
    },[]);

    useEffect(() => {
        if (BoardInfo.length !== 0) {
            setHasBoard(true);
        }
        else {
            setHasBoard(false);
        }
    } ,[BoardInfo]);

    return (
        <React.Fragment>
            {HasBoard ? 
            BoardInfo.map((c) => (
                <Card key={c.studyId}>
                    <h1>제목: {c.title}</h1>
                    <p>토픽: {c.topic}</p>
                    <p>총 정원: {c.headCount}</p>
                    <p>가입한 인원: {c.joinCount}</p>
                    <p>모집 상태: {c.recruitState}</p>
                    <p>스터디 상태: {c.studyState}</p>
                    <Link to={`/profile/updateStudyInfo/${c.studyId}`}>수정하기</Link>
                    <Link to={`/study/${c.studyId}`}>보러가기</Link>
                </Card>
            )): <div>스터디 게시판이 없습니다.</div>}
        </React.Fragment>
    )
}

export default MyStudy;
