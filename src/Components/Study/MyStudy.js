import React, {useEffect,useState} from 'react';
import { getMyStudyInfo} from '../../Api/Api';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import { useQuery } from 'react-query';
import { getCookie } from '../../utils/cookie';
import styled from 'styled-components';

const StudyCardContainer = styled.div`
    width: 90vw;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-auto-rows: minmax(200px,1fr);
    grid-gap: 20px;
    margin: 20px auto;

`;

function MyStudy() {
    const {data:studyInfos} = useQuery(["myStudyInfos"],()=>getMyStudyInfo(getCookie('accessToken')),{
        select: (data) => data.data.data,
        retry: false,
        staleTime: Infinity,
    });

    return (
        <StudyCardContainer>
            {studyInfos ? 
            studyInfos?.map((c) => (
                <Card key={c.studyId}>
                    <h2>{c.title}</h2>
                    <p>모집 상태: {c.recruitState}</p>
                    <p>스터디 상태: {c.studyState}</p>
                    <p>{c.startDate}~{c.endDate}</p>
                    <p>{c.studyMethod}</p>
                    <p>
                        {c.tags?.map((tag,index)=>(
                            <span key={index}>{tag}</span>
                        ))}
                    </p>
                    <Link to={`/study/${c.studyId}/edit`}>수정하기</Link>
                    <Link to={`/study/${c.studyId}`}>보러가기</Link>
                </Card>
            )): <div>스터디 게시판이 없습니다.</div>}
        </StudyCardContainer>
    )
}

export default MyStudy;
