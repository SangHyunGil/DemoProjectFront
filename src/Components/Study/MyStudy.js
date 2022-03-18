import React, { useEffect, useState } from "react";
import { getMyStudyInfo } from "../../Api/Api";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useQuery } from "react-query";
import { getCookie } from "../../utils/cookie";
import styled from "styled-components";
import StudyStatus from "./StudyStatus";
import { TagsWrapper, StatusWrapper } from "./BoardDetail";

const StudyCardContainer = styled.div`
  width: 90vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-auto-rows: minmax(200px, 1fr);
  grid-gap: 20px;
  margin: 20px auto;
  @media (max-width: 450px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const MyStudyCard = styled(Card)`
  position: relative;
  padding: 0.5rem 2rem;
  display: flex;
  flex-direction: column;
  .StudyCardHeader {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(0,0,0,0.2);
  }
  div {
    &:last-child {
      align-self: flex-end;
      button {
        a {
          text-decoration: none;
          color: #1976d2;
          font-weight: bolder;
        }
      }
    }
  }
`;

const StudyStatusBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-wrap: wrap;
  color: #339667;
  p {
    padding: 5px 10px;
    background-color: #d0fae4;
    border-radius: 5px;
  }
  @media (max-width: 460px) {
    position: relative;
    display: flex;
    gap: 1rem;
    padding: 0;
    align-items: flex-start;
    margin-top: 1rem;
    p {
      margin-left: 0;
    }
  }
`;

function MyStudy() {
  const { data: studyInfos } = useQuery(
    ["myStudyInfos"],
    () => getMyStudyInfo(getCookie("accessToken")),
    {
      select: (data) => data.data.data,
      retry: false,
    }
  );

  return (
    <StudyCardContainer>
      {studyInfos ? (
        studyInfos?.map((c) => (
          <MyStudyCard key={c.id}>
            <div>
              <div className="StudyCardHeader">
                <div className="MyStudyCardTitle">
                  <h2>{c.title}</h2>
                  <p>{c.creator.nickname}</p>
                </div>
                <StudyStatusBlock>
                  <StudyStatus title="recruit" content={c.recruitState} />
                  <StudyStatus title="study" content={c.studyState} />
                </StudyStatusBlock>
              </div>
              <TagsWrapper>
                {c.tags?.map((tag, index) => (
                  <li key={index}>{tag}</li>
                ))}
              </TagsWrapper>
              <StatusWrapper>
                <StudyStatus title="method" content={c.studyMethod} />
                <p>
                  {c.startDate}~{c.endDate}
                </p>
              </StatusWrapper>
            </div>
            <CardActions>
              <Button size="small">
                <Link to={`/study/${c.id}/edit`}>수정하기</Link>
              </Button>
              <Button size="small">
                <Link to={`/study/${c.id}`}>보러가기</Link>
              </Button>
            </CardActions>
          </MyStudyCard>
        ))
      ) : (
        <div>스터디 게시판이 없습니다.</div>
      )}
    </StudyCardContainer>
  );
}

export default MyStudy;
