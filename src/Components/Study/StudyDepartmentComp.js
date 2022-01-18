import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { findAllBoardsPreview } from "../../Api/Api";
import Card from "@mui/material/Card";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import StudyDetailCard from "../Card/StudyDetailCard";

const CardWrapper = styled(motion.div)`
  width: 90vw;
  display: grid;
  grid-template-columns: repeat(6, minmax(200px, 1fr));
  grid-gap: 30px;
  justify-items: center;
  margin: 0 auto;
  @media (max-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const CardLink = styled(Link)`
  width: 100%;
`;

const StudyCardWrapper = styled(motion.div)`
  position: relative;
`;

const StudyCard = styled(Card)`
  text-decoration: none;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StudyCardBackDrop = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

const StudyCardHeader = styled(motion.div)`
  position: absolute;
  top: 5%;
  right: 0;
  span {
    background: rgba(231, 76, 60, 1);
    padding: 1px;
    border-radius: 4px;
    &:first-child {
      margin-right: 5px;
    }
  }
`;

const StudyCardTextWrapper = styled(motion.div)`
  position: absolute;
  bottom: 0;
  color: rgba(0, 0, 0, 1);
`;

const StudyCardSubInfo = styled(motion.div)`
  display: none;
  background-color: rgba(149, 165, 166, 1);
  border-radius: 0 0 4px 4px;
`;

const StudyCardDetailContainer = styled(motion.div)`
  div {
    z-index: 10;
  }
`;

const StudyCardDetailBackDrop = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
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

const StudyWrapperVariants = {
  hidden: {
    scale: 1,
  },
  visible: {
    scale: 1.2,
  },
};

const StudyCardBackDropVariants = {
  hidden: {
    background: "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))",
  },
  visible: {
    background: "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5))",
  },
};

const StudyCardTextVariants = {
  hidden: {
    color: "rgba(0, 0, 0, 1)",
  },
  visible: {
    color: "rgba(255, 255, 255, 1)",
  },
};

const StudyCardSubInfoVariants = {
  hidden: {
    display: "none",
  },
  visible: {
    display: "block",
  },
};

function StudyDepartmentComp() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [lastId, setlastId] = useState(100000);
  const { department } = useParams();
  const queryClient = useQueryClient();
  const [currDepartment, setcurrDepartment] = useState(department);
  const [SelectedId, setSelectedId] = useState(null);

  const { data: boards, isPreviousData } = useQuery(
    ["study", department, page],
    () => findAllBoardsPreview(lastId, department, 6),
    {
      select: (data) => data.data.data,
      onSuccess: (data) => console.log(data),
      initialData: () => queryClient.getQueryData(["study", department, page]),
      initialDataUpdatedAt: () =>
        queryClient.getQueryState(["study", department, page])?.dataUpdatedAt,
      staleTime: 1000,
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
  }, [department, currDepartment]);

  useEffect(() => {
    if (boards?.hasNext) {
      queryClient.prefetchQuery(["study", department, page + 1], () =>
        findAllBoardsPreview(lastId, department, 6)
      );
    }
  }, [boards, department, page, queryClient, lastId]);

  const nextButtonClickHandler = () => {
    paginate(1);
    setlastId(boards.data[boards.data.length - 1].studyId);
  };

  const prevButtonClickHandler = () => {
    paginate(-1);
    setlastId(boards.data[0].studyId + 7);
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
            x: { type: "spring", stiffness: 300, damping: 30 },
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
                <StudyCardWrapper
                  key={board.studyId}
                  variants={StudyWrapperVariants}
                  initial="hidden"
                  whileHover="visible"
                  layoutId={`Detail${board.studyId}`}
                  onClick={() => setSelectedId(board.studyId)}
                >
                  <StudyCard>
                    <StudyCardHeader>
                      <span>{board.recruitState}</span>
                      <span>{board.studyState}</span>
                    </StudyCardHeader>
                    <img
                      src={
                        imgSplitedurl.startsWith("/")
                          ? imgSplitedurl
                          : `/profile/${imgSplitedurl}`
                      }
                      alt="study-img"
                    />
                    <StudyCardBackDrop variants={StudyCardBackDropVariants} />
                    <StudyCardTextWrapper variants={StudyCardTextVariants}>
                      <motion.h2>{board.title}</motion.h2>
                      <motion.p>{board.creator.nickname}</motion.p>
                      {board.tags.map((tag) => (
                        <TagWrapper key={Math.random()*1000+idx}>{tag}</TagWrapper>
                      ))}
                    </StudyCardTextWrapper>
                  </StudyCard>
                  <StudyCardSubInfo variants={StudyCardSubInfoVariants}>
                    <p>{board.studyMethod}</p>
                    <p>
                      {board.startDate}~{board.endDate}
                    </p>
                  </StudyCardSubInfo>
                </StudyCardWrapper>
              
            );
          })}
        </CardWrapper>
      </AnimatePresence>
      {SelectedId && (
          <>
            <StudyCardDetailBackDrop onClick={()=>setSelectedId(null)} />
            <StudyCardDetailContainer layoutId={`Detail${SelectedId}`}>
              <StudyDetailCard />
            </StudyCardDetailContainer>
          </>
      )}
      <Link to="all">전체보기</Link>
      <button
        disabled={isPreviousData || page === 0}
        onClick={prevButtonClickHandler}
      >
        이전
      </button>
      <button
        disabled={!boards?.hasNext || isPreviousData}
        onClick={nextButtonClickHandler}
      >
        다음
      </button>
    </>
  );
}

export default StudyDepartmentComp;
