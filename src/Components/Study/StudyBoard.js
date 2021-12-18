import React, {useState} from 'react';
import {Outlet, useParams} from 'react-router-dom';
import { useSelector} from "react-redux";
import {getBoardCategory} from '../../Api/Api';
import {useQuery} from 'react-query';
import {getCookie} from '../../utils/cookie';
import {CategoryWrapper,Category} from '../Categories/Categories';

function StudyBoard() {
    const [IsGranted, setIsGranted] = useState(false);
    const {studyInfos} = useSelector(state => state.users);
    const {studyId} = useParams();
    const {data:category} = useQuery(['getBoardCategory',studyId],()=>getBoardCategory(studyId,getCookie('accessToken')),{
        select: (cat) => cat.data.data,
        onSuccess: ()=>{
            const Role  = studyInfos.find(x=>x.studyId===Number(studyId))?.studyRole;
            console.log(Role);
            if (Role === 'CREATOR' || Role === 'ADMIN') {
                setIsGranted(true);
            }
            else {
                setIsGranted(false);
            }
        },
        retry: false,
    });

    return (
        <>
            <CategoryWrapper>
                {category?.map((cat) => (<Category activeclassname="active" to={`/study/${studyId}/board/${cat.studyBoardId}/articles`} key={cat.studyBoardId}>{cat.title}</Category>))}
                {IsGranted && <Category to={`/study/${studyId}/board/manage`}>게시판 관리</Category>}
            </CategoryWrapper>
            <Outlet />
        </>
    )
}

export default StudyBoard;
