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

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

function StudyDepartmentComp() {
  const [[page, direction], setPage] = useState([0, 0]);
  const queryClient = useQueryClient();

  const { department } = useParams();
  const { data: boards } = useQuery(
    ["study", department,page],
    () => findAllBoards((page+1)+2, department, 2),
    {
      select: (data) => data.data.data,
      onSuccess: (data) => console.log(data),
      keepPreviousData: true,
    }
  );

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    if (boards?.hasNext){
      queryClient.prefetchQuery(["study", department,page+1],()=>findAllBoards((page+3)+2, department, 2));
    }
  },[boards,page,queryClient,department]);

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <CardWrapper
          key={page}
          custom={direction}
          variants={sliderVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
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
      <button disabled={!boards?.hasNext} onClick={() => paginate(1)}>
        다음
      </button>
      <button disabled={page===0} onClick={() => paginate(-1)}>
        이전
      </button>
    </>
  );
}

export default StudyDepartmentComp;
