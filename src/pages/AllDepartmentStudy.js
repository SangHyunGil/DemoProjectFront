import React, { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { findAllBoardsTotal } from '../Api/Api';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { motion } from 'framer-motion/dist/framer-motion';
import CardActions from '@mui/material/CardActions';
import Avatar from "@mui/material/Avatar";

const StudyCardContainer = styled.div`
    width: 90vw;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 30px;
    margin: 0 auto;
    @media (max-width: 600px) {
        grid-template-columns:  minmax(200px, 1fr);
    }
`;

const StudySubInfo = styled(motion.div)`
  display: none;
  p {
    &:first-child {
      margin-right: 5px;
    }
  }
`;

const StudyCardWrapper = styled(motion.div)`
  position: relative;
  z-index: 1;
  width: 100%;
`;

const StudyProceedStatus = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  background-color: #9fffe5;
  color: #047d37;
  padding: 5px 10px;
  margin-right: 5px;
  margin-top: 10px;
  border-radius: 5px;
`;

const StudyCard = styled(Card)`
  text-decoration: none;
  position: relative;
  font-family: "SEBANG_Gothic_Bold", sans-serif;
  img {
    border: 1px solid rgba(0,0,0,0.2);
  }
`;

const StudyCardContent = styled(CardContent)`
  padding: .5rem 1rem;
  border-bottom: 1px solid rgba(0,0,0,0.2);
`;

const TagWrapper = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 5px 0;
`;

const Tag = styled.li`
  display: flex;
  align-items: center;
  background-color: #047d37;
  border-radius: 5px;
  padding: 2px 5px;
  color: white;
  font-size: 12px;
  & + & {
    margin-left: 5px;
  } 
`;

const StudyCardCreator = styled(CardActions)`
  img {
    width: 50%;
    height: 50%;
    border: 0;
  }
`;

const StudyWrapperVariants = {
    hidden: {
      scale: 1,
    },
    visible: {
      scale: 1.2,
    },
  };
  
  const StudyCardSubInfoVariants = {
    hidden: {
      display: "none",
    },
    visible: {
      display: "flex",
    },
  };

const NotFoundStudyStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    a {
        margin: 20px 0;
        color: white !important;
        padding: 10px 20px;
        background-color: #0049AF;
    }
    margin-bottom: 10%;
    @media (max-width: 400px) {
        img {
            width: 80%;
        }
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
        onSuccess: (data)=>{
            console.log(data);
        },
    });
    
    useEffect(()=>{
        if(inView && hasNextPage){
            fetchNextPage();
        }
    },[inView, hasNextPage, fetchNextPage]);

    console.log(StudyData?.pages[0].data?.data?.numberOfElements === 0);
    return (
        <>
            {StudyData?.pages[0].data?.data?.numberOfElements === 0 && (
                <NotFoundStudyStyle>
                    <img src="/StudyImg/StudyNotFound.png" alt="StudyNotFound!" />
                    <h3>아직 만들어진 스터디가 없어요, 만들러 가보실 까요?</h3>
                    <Link to={`/study/create`} >만들러 가기</Link>
                </NotFoundStudyStyle>
            )}
            <StudyCardContainer>
                {StudyData?.pages?.map((page,Pageidx)=>(
                    <React.Fragment key={Pageidx}>
                        {page?.data?.data?.data?.map((board,idx)=>{
                            const {
                                profileImg,
                                creator: { profileImgUrl },
                              } = board;
                              return (
                                <Link to={`/study/${board.studyId}`} key={board.studyId}>
                                  <StudyCardWrapper
                                    variants={StudyWrapperVariants}
                                    initial="hidden"
                                    whileHover="visible"
                                    exit="hidden"
                                    layoutId={`Detail${board.studyId}`}
                                    ref={idx === page?.data?.data?.data?.length-1 ? ref : null}
                                  >
                                    <StudyProceedStatus>{board.recruitState}</StudyProceedStatus>
                                    <StudyCard>
                                      <CardMedia 
                                        component="img"
                                        height="200"
                                        alt="Study"
                                        image={profileImg}
                                      />
                                      <StudyCardContent>
                                        <h2>{board?.title}</h2>
                                        <TagWrapper>
                                          {board?.tags?.map((tag) => (
                                            <Tag key={Math.random()}>{tag}</Tag>
                                          ))}
                                        </TagWrapper>
                                        <StudySubInfo variants={StudyCardSubInfoVariants}>
                                            <p>{board.studyMethod}</p>
                                            <p>{board.startDate}~{board.endDate}</p>
                                        </StudySubInfo>
                                      </StudyCardContent>
                                      <StudyCardCreator>
                                        <Avatar
                                          src={profileImgUrl === '디폴트이미지 경로' ? 'https://koner-bucket.s3.ap-northeast-2.amazonaws.com/profileImg/koryong1.jpg' : profileImgUrl}
                                        />
                                        <p>{board.creator.nickname}</p>
                                      </StudyCardCreator>
                                    </StudyCard>
                                  </StudyCardWrapper>
                                </Link>
                              );
                        })}
                    </React.Fragment>
                ))}
            </StudyCardContainer>
        </>
    )
}

export default AllDepartmentStudy;
