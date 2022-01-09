import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getBoardCategory } from "../../Api/Api";
import { useQuery } from "react-query";
import { getCookie } from "../../utils/cookie";
import { Category } from "../Categories/Categories";
import styled from "styled-components";

const CategoryWrapper = styled.div`
    display: flex;
    padding: 1rem;
    border-bottom: 2px solid #e6e6e6;
`;

function StudyBoard() {
  const [IsGranted, setIsGranted] = useState(false);
  const { studyInfos } = useSelector((state) => state.users);
  const { studyId } = useParams();
  const { data: category } = useQuery(
    ["getBoardCategory", studyId],
    () => getBoardCategory(studyId, getCookie("accessToken")),
    {
      select: (cat) => cat.data.data,
      retry: false,
    }
  );

  useEffect(() => {
    if (category) {
      const Role = studyInfos.find(
        (x) => x.studyId === Number(studyId)
      )?.studyRole;
      if (Role === "CREATOR" || Role === "ADMIN") {
        setIsGranted(true);
      } else {
        setIsGranted(false);
      }
    }
  },[category, studyInfos, studyId]);

  return (
    <>
      <CategoryWrapper>
        {category?.map((cat) => (
          <Category
            activeclassname="active"
            to={`/study/${studyId}/board/${cat.studyBoardId}/articles`}
            key={cat.studyBoardId}
          >
            {cat.title}
          </Category>
        ))}
        {IsGranted && (
          <Category
            to={`/study/${studyId}/board/manage`}
          >
            게시판 관리
          </Category>
        )}
      </CategoryWrapper>
      <Outlet />
    </>
  );
}

export default StudyBoard;
