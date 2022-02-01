import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { getBoardCategory, findBoard } from "../../Api/Api";
import { useQuery, useQueryClient } from "react-query";
import { getCookie } from "../../utils/cookie";
import { Category } from "../Categories/Categories";
import styled from "styled-components";

const CategoryWrapper = styled.div`
    display: flex;
    padding: 1rem;
    border-bottom: 2px solid #e6e6e6;
`;

function StudyBoard() {
  const queryClient = useQueryClient();
  const [IsGranted, setIsGranted] = useState(false);
  const { studyId } = useParams();
  
  const myinfos = queryClient.getQueryData(['loadMyInfo']);

  const {data:studyInfos} = useQuery([`studyInfos`, studyId], ()=>findBoard(studyId), {
    select: (data) => data.data.data.studyMembers,
    onSuccess: (data) => {
      const myInfo = data.find((info) => info.nickname === myinfos?.data?.data?.nickname);
      if (myInfo?.studyRole === "ADMIN" || myInfo?.studyRole === "CREATOR") {
        setIsGranted(true);
      }
      else {
        setIsGranted(false);
      }
    },
    staleTime: Infinity,
  });

  const { data: category } = useQuery(
    ["getBoardCategory", studyId],
    () => getBoardCategory(studyId, getCookie("accessToken")),
    {
      select: (cat) => cat.data.data,
      retry: false,
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (!!myinfos?.data?.data?.nickname && !!studyInfos) {
      const {data: {data: {nickname}}} = myinfos;
      const myInfo = studyInfos?.find((info) => info.nickname === nickname);
      if (myInfo?.studyRole === "ADMIN" || myInfo?.studyRole === "CREATOR") {
        setIsGranted(true);
      }
      else {
        setIsGranted(false);
      }
    }
  },[myinfos, studyInfos]);

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
        <Category to={`/study/${studyId}`} style={{color:'black'}}>
          게시판 정보
        </Category>
        <Category to={`/study/${studyId}/board/calendar`}>스터디 캘린더</Category>
      </CategoryWrapper>
      <Outlet />
    </>
  );
}

export default StudyBoard;
