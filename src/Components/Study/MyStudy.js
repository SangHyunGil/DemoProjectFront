import React, {useEffect,useState} from 'react';
import { getMyStudyInfo} from '../../Api/Api';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useQuery } from 'react-query';
import { getCookie } from '../../utils/cookie';
import styled from 'styled-components';
import StudyStatus from './StudyStatus';

const StudyCardContainer = styled.div`
    width: 90vw;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-auto-rows: minmax(200px,1fr);
    grid-gap: 20px;
    margin: 20px auto;
    @media (max-width: 450px) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
`;

const MyStudyCard = styled(Card)`
    div {
        &:last-child {
            button {
                a {
                    text-decoration: none;
                    color: #1976d2;
                    font-weight: bolder;
                }
            }
        }
    }
`;

const StudyStatusBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
    p {
        padding: 5px 10px;
        background-color: #55efc4;
        border-radius: 5px;
        margin-left: 10px;
        &:first-child {
            margin-left: 0;
        }
    }
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
                <MyStudyCard key={c.studyId}>
                    <div>
                       <h2>{c.title}</h2>
                       <StudyStatusBlock>
                           <StudyStatus title="recruit" content={c.recruitState} />
                           <StudyStatus title="study" content={c.studyState} />
                           <StudyStatus title="method" content={c.studyMethod} />
                       </StudyStatusBlock>  
                       <p>{c.startDate}~{c.endDate}</p>
                        <p>
                            {c.tags?.map((tag,index)=>(
                                <span key={index}>{tag}</span>
                            ))}
                        </p>
                    </div>
                    <CardActions>
                        <Button size='small'><Link to={`/study/${c.studyId}/edit`}>수정하기</Link></Button>
                        <Button size='small'><Link to={`/study/${c.studyId}`}>보러가기</Link></Button>
                    </CardActions>
                </MyStudyCard>
            )): <div>스터디 게시판이 없습니다.</div>}
        </StudyCardContainer>
    )
}

export default MyStudy;
