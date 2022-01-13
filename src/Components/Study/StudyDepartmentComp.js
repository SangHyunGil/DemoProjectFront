import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { findAllBoards } from "../../Api/Api";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const CardWrapper = styled(motion.div)`
  width: 90vw;
  display: grid;
  grid-template-columns: repeat(6, minmax(200px, 1fr));
  grid-gap: 10px;
  justify-items: center;
  margin: 0 auto;
  @media (max-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const CardLink = styled(Link)`
  width: 100%;
`;

const StudyCard = styled(Card)`
  text-decoration: none;
`;

const TagWrapper = styled.span`
  background-color: #fd79a8;
  border-radius: 5px;
  padding: 0 5px;
  color: white;
  font-size: 12px;
`;

const sliderVariants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

function StudyDepartmentComp() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [lastId, setlastId] = useState(100000);
  const { department } = useParams();
  const queryClient = useQueryClient();
  const [currDepartment, setcurrDepartment] = useState(department);
  
  const { data: boards, isPreviousData } = useQuery(
    ["study", department,page],
    () => findAllBoards(lastId, department, 6),
    {
      select: (data) => data.data.data,
      onSuccess: (data) => console.log(data),
      retry: false,
      keepPreviousData: true,
    }
  );
  
  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    if (currDepartment !== department) {
      setPage([0, 0]);
      setlastId(100000);
      setcurrDepartment(department);
    }
  },[department, currDepartment]);

  useEffect(() => {
    if (boards?.hasNext){
      queryClient.prefetchQuery(["study",department,page+1],()=>findAllBoards(lastId, department, 6));
    }
  },[boards,department,page,queryClient,lastId]);

  const nextButtonClickHandler = () => {
    paginate(1);
    setlastId(boards.data[boards.data.length-1].studyId);
  };
  
  const prevButtonClickHandler = () => {
    paginate(-1);
    setlastId(boards.data[0].studyId+7);
  };
  return (
    <>
      <AnimatePresence initial={false} custom={direction} exitBeforeEnter>
        <CardWrapper
          key={page}
          custom={direction}
          variants={sliderVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: {type: "spring", stiffness: 300, damping: 30},
          }}
        >
          {boards?.data?.map((board, idx) => {
            const {
              profileImg,
              creator: { profileImgUrl },
            } = board;
            const imgSplitedurl = profileImg.split("/").reverse()[0];
            const profileSplitedUrl = profileImgUrl.split("/").reverse()[0];
            return (
              <CardLink
                style={{ textDecoration: "none" }}
                to={{ pathname: `/study/${board.studyId}` }}
                key={board.studyId}
              >
                <StudyCard>
                  <CardHeader
                    avatar={
                      <Avatar
                        src={
                          profileSplitedUrl.startsWith("/")
                            ? profileSplitedUrl
                            : `/profile/${profileSplitedUrl}`
                        }
                      />
                    }
                    title={board.creator?.nickname}
                  />
                  <CardMedia
                    component="img"
                    height="140"
                    image={
                      imgSplitedurl.startsWith("/")
                        ? imgSplitedurl
                        : `/profile/${imgSplitedurl}`
                    }
                    alt="study Thumbnail"
                  />
                  <CardContent>
                    <h2>{board.title}</h2>
                    {board.tags?.map((tag) => (
                      <TagWrapper key={Math.random()}>{tag}</TagWrapper>
                    ))}
                    <p>{`recruit: ${board?.recruitState}`}</p>
                    <p>{`study: ${board?.studyState}`}</p>
                  </CardContent>
                </StudyCard>
              </CardLink>
            );
          })}
        </CardWrapper>
      </AnimatePresence>
      <button disabled={isPreviousData || page===0} onClick={prevButtonClickHandler}>
        이전
      </button>
      <button disabled={!boards?.hasNext || isPreviousData} onClick={nextButtonClickHandler}>
        다음
      </button>
    </>
  );
}

export default StudyDepartmentComp;
