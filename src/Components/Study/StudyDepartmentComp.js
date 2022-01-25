import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { findAllBoardsPreview } from "../../Api/Api";
import Card from "@mui/material/Card";
import styled from "styled-components";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
} from "framer-motion/dist/framer-motion";
import StudyDetailCard from "../Card/StudyDetailCard";
import Avatar from "@mui/material/Avatar";
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CardWrapper = styled(motion.div)`
  width: 90vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 40px;
  justify-items: center;
  margin: 0 auto;
  z-index: 1;
  &:hover {
    cursor: pointer;
  }
`;

const CardLink = styled(Link)`
  width: 100%;
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
  z-index: 2;
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

const StudySubInfo = styled(motion.div)`
  display: flex;
  p {
    &:first-child {
      margin-right: 5px;
    }
  }
`;

const PrevButton = styled.button`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  svg {
    font-size: 3rem;
  }
  &:hover {
    cursor: pointer;
  }
  z-index: 10;
`;

const NextButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  svg {
    font-size: 3rem;
  }
  &:hover {
    cursor: pointer;
  }
  z-index: 10;
`;

const NoneOfStudyCard = styled.div`
  min-height: 260px;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  grid-column: 1 / -1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StudyAllLinkWrapper = styled.div`
  text-align: center;
  margin-top: 3rem;
  a {
    text-decoration: none;
    color: #047d37;
    background: #9fffe5;
    padding: 10px 20px;
    border-radius: 5px;
  }
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
      <LayoutGroup id="slider">
        <AnimatePresence
          initial={false}
          custom={direction}
          exitBeforeEnter
          key={1}
        >
          <div style={{ position: "relative" }}>
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
              {boards?.data.length === 0 && (
                <NoneOfStudyCard>
                  <h2>아직 스터디가 없어요!</h2>
                </NoneOfStudyCard>
              )}
              {boards?.data?.map((board, idx) => {
                const {
                  profileImg,
                  creator: { profileImgUrl },
                } = board;
                const imgSplitedurl = profileImg.split("/").reverse()[0];
                const profileSplitedUrl = profileImgUrl.split("/").reverse()[0];
                return (
                  <React.Fragment key={board.studyId}>
                    <StudyCardWrapper
                      variants={StudyWrapperVariants}
                      initial="hidden"
                      whileHover="visible"
                      layoutId={`Detail${board.studyId}`}
                      onClick={() => setSelectedId(board.studyId)}
                    >
                      <StudyProceedStatus>{board.recruitState}</StudyProceedStatus>
                      <StudyCard>
                        <CardMedia 
                          component="img"
                          height="200"
                          alt="Study"
                          image={imgSplitedurl.startsWith("/")
                          ? imgSplitedurl
                          : `/profile/${imgSplitedurl}`}
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
                            src={profileSplitedUrl.startsWith("/")
                              ? profileSplitedUrl
                              : `/profile/${profileSplitedUrl}`}
                          />
                          <p>{board.creator.nickname}</p>
                        </StudyCardCreator>
                      </StudyCard>
                    </StudyCardWrapper>
                  </React.Fragment>
                );
              })}
            </CardWrapper>
            <PrevButton
              disabled={isPreviousData || page === 0}
              onClick={prevButtonClickHandler}
            >
              <ArrowBackIosNewIcon />
            </PrevButton>
            <NextButton
              disabled={!boards?.hasNext || isPreviousData}
              onClick={nextButtonClickHandler}
            >
              <ArrowForwardIosIcon />
            </NextButton>
          </div>
        </AnimatePresence>
      </LayoutGroup>
      <StudyAllLinkWrapper>
              <Link to="all">전체보기</Link>
      </StudyAllLinkWrapper>
      <LayoutGroup id="modal">
        {SelectedId && (
          <AnimatePresence>
            <React.Fragment key={SelectedId}>
              <StudyCardDetailBackDrop onClick={() => setSelectedId(null)} />
              <StudyCardDetailContainer layoutId={`Detail${SelectedId}`}>
                <StudyDetailCard id={SelectedId} StudyData={boards} />
              </StudyCardDetailContainer>
            </React.Fragment>
          </AnimatePresence>
        )}
      </LayoutGroup>
    </>
  );
}

export default StudyDepartmentComp;
