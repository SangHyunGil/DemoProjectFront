import React, { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getBoardCategory } from "../../Api/Api";
import { useQuery } from "react-query";
import { getCookie } from "../../utils/cookie";
import { Category, UnderLine } from "../Categories/Categories";
import styled from "styled-components";

const UnderLineVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const CategoryWrapper = styled.div`
    display: flex;
    padding: 1rem;
    border-bottom: 2px solid #e6e6e6;
`;

function StudyBoard() {
  const [IsGranted, setIsGranted] = useState(false);
  const [IsSelected, setIsSelected] = useState("공지사항");
  const { studyInfos } = useSelector((state) => state.users);
  const { studyId } = useParams();
  const { data: category } = useQuery(
    ["getBoardCategory", studyId],
    () => getBoardCategory(studyId, getCookie("accessToken")),
    {
      select: (cat) => cat.data.data,
      onSuccess: () => {
        const Role = studyInfos.find(
          (x) => x.studyId === Number(studyId)
        )?.studyRole;
        console.log(Role);
        if (Role === "CREATOR" || Role === "ADMIN") {
          setIsGranted(true);
        } else {
          setIsGranted(false);
        }
      },
      retry: false,
    }
  );

  return (
    <>
      <CategoryWrapper>
        {category?.map((cat) => (
          <Category
            activeclassname="active"
            onClick={() => setIsSelected(cat.title)}
            to={`/study/${studyId}/board/${cat.studyBoardId}/articles`}
            key={cat.studyBoardId}
          >
            {cat.title}
            {IsSelected === cat.title ? (
              <UnderLine
                variants={UnderLineVariants}
                initial="hidden"
                animate="visible"
              />
            ) : null}
          </Category>
        ))}
        {IsGranted && (
          <Category
            onClick={() => setIsSelected("게시판 관리")}
            to={`/study/${studyId}/board/manage`}
          >
            게시판 관리
            {IsSelected === "게시판 관리" ? (
              <UnderLine
                variants={UnderLineVariants}
                initial="hidden"
                animate="visible"
              />
            ) : null}
          </Category>
        )}
      </CategoryWrapper>
      <Outlet />
    </>
  );
}

export default StudyBoard;
