import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { findAllBoards, findAllBoardsTotal } from '../Api/Api';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

const StudyCardContainer = styled.div`
    width: 90vw;
    display: grid;
    grid-template-columns: repeat(4, minmax(200px, 1fr));
    grid-auto-rows: minmax(400px, auto);
    grid-gap: 10px;
    margin: 0 auto;
    @media (max-width: 600px) {
        grid-template-columns: minmax(200px, 1fr);
    }
`;

const StudyCard = styled.div`
    width: 100%;
    text-decoration: none;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
    border-radius: 5px;
    img {
        width: 60%;
    }
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
                                creator: { profileImgUrl },
                              } = study;
                              const imgSplitedurl = profileImg.split("/").reverse()[0];
                              const profileSplitedUrl = profileImgUrl.split("/").reverse()[0];
                              
                            return (
                            <Link to={{ pathname: `/study/${study.studyId}` }} key={study.studyId}>
                                <StudyCard ref={idx === page?.data?.data?.data?.length-1 ? ref : null}>
                                    <p>{study.content}</p>
                                    <img src={imgSplitedurl} alt='profile'></img>
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
