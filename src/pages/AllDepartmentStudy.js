import React, { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { findAllBoardsTotal } from '../Api/Api';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const StudyCardContainer = styled.div`
    width: 90vw;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    grid-gap: 30px;
    margin: 0 auto;
    @media (max-width: 600px) {
        grid-template-columns: minmax(200px, 1fr);
    }
`;

const StudyCard = styled(Card)`
    display: flex;
`;

const StudyCardContent = styled(CardContent)`
    flex-grow: 1;

`;

function AllDepartmentStudy() {
    const { department } = useParams();
    const {ref, inView } = useInView({threshold: 0.5});
    const { data:StudyData, hasNextPage, fetchNextPage } = useInfiniteQuery(["AllDepartmentStudy", department],({pageParam = {studyId:1000000,department,size:8}})=>findAllBoardsTotal(pageParam),{
        getNextPageParam: (lastPage) =>{
            const {data:{data:{data,hasNext}}} = lastPage;
            if(!hasNext){
                return undefined;
            }
            return {studyId:data[data.length-1].studyId,department,size:8};
        },
    });
    
    useEffect(()=>{
        if(inView && hasNextPage){
            fetchNextPage();
        }
    },[inView, hasNextPage, fetchNextPage]);

    return (
        <div>
            <StudyCardContainer>
                {StudyData?.pages?.map((page,Pageidx)=>(
                    <React.Fragment key={Pageidx}>
                        {page?.data?.data?.data?.map((study,idx)=>{
                            
                            const {
                                profileImg,
                                creator: { profileImgUrl, nickname },
                              } = study;
                              const imgSplitedurl = profileImg.split("/").reverse()[0];
                              //const profileSplitedUrl = profileImgUrl.split("/").reverse()[0];
                              
                            return (
                            <Link to={{ pathname: `/study/${study.studyId}` }} key={study.studyId} style={{textDecoration:'none'}}>
                                <StudyCard ref={idx === page?.data?.data?.data?.length-1 ? ref : null}>
                                    <CardMedia 
                                        component="img"
                                        sx={{width: '150px'}}
                                        image = {imgSplitedurl}
                                        alt="StudyCardImg"
                                    />
                                    <StudyCardContent>
                                        <h2>{study.content}</h2>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {nickname}
                                        </Typography>
                                    </StudyCardContent>
                                </StudyCard>
                            </Link>)
                        })}
                    </React.Fragment>
                ))}
            </StudyCardContainer>
            <button onClick={()=>fetchNextPage()} disabled={!hasNextPage} >다음페이지</button>
        </div>
    )
}

export default AllDepartmentStudy;
