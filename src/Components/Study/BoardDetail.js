import React, { useEffect, useState } from "react";
import {
  findBoard,
  join,
  findUserBoard,
  getBoardCategory,
} from "../../Api/Api";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { updateStudyIds } from "../../reducers/users";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styled from "styled-components";

const MainHeaderWrapper = styled.header`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-family: "OTWelcomeBA", sans-serif;
  font-size: 2rem;
  margin-top: 20px;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.3rem;
    }
    img {
      transform: scale(0.7);
    }
  }
`;

const MainWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, 1fr));
  grid-tmpate-rows: repeat(3, minmax(300px, 1fr));
  row-gap: 20px;
  column-gap: 10px;
  padding: 0 20px;
`;

const DetailCard = styled(Card)`
  display: inline-block;
  &:nth-child(odd) {
    justify-self: end;
  }
  &:nth-child(2n) {
    justify-self: start;
  }
  &:last-child {
    justify-self: center;
    grid-column: span 2;
  }
`;

const AvatarWrapper = styled.div`
  display: inline-flex;
  span {
    display: flex;
    align-items: center;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function BoardDetail({ boardId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { isChecked, isLogin, id, accessToken, studyInfos } = useSelector(
    (state) => state.users
  );
  const [IsAlreadyJoined, setIsAlreadyJoined] = useState(false);
  const [isClosed, setisClosed] = useState(false);
  const { data: board } = useQuery(
    ["board", params.boardId],
    () => getBoardCategory(params.boardId, getCookie("accessToken")),
    {
      select: (x) => x.data.data,
      onError: (err) => console.log(err),
      enabled: isLogin,
    }
  );
  const { data: BoardContent } = useQuery(
    ["boardContent", params.boardId],
    () => findBoard(params.boardId, getCookie("accessToken")),
    {
      select: (x) => x.data.data,
      onSuccess: () => {
        studyInfos.forEach((element) => {
          if (element.studyId + "" === params.boardId) {
            setIsAlreadyJoined(true);
          }
        });
        Number(BoardContent?.headCount) === Number(BoardContent?.joinCount) &&
        !IsAlreadyJoined
          ? setisClosed(true)
          : setisClosed(false);
      },
    }
  );

  const BoardDetailHandler = (e) => {
    if (isChecked && isLogin) {
      if (e.target.name === "Join") {
        join(boardId, id, accessToken)
          .then((response) => {
            console.log(response.data);
            const {
              data: { studyInfos },
            } = response.data;
            dispatch(updateStudyIds(...studyInfos));
            navigate("/study");
          })
          .catch((error) => console.log(error));
        return;
      } else if (e.target.name === "Direct") {
        navigate(
          `/study/${params.boardId}/board/${board[0].studyBoardId}/articles`
        );
        return;
      }
    }
    navigate("/login");
  };

  const StudyStatus = {
    study: {
      PREPARE: "준비중",
      STUDYING: "진행중",
      FINISH: "종료",
    },
    recruit: {
      PROCEED: "진행중",
      END: "종료",
    },
  };

  return (
    <>
      <MainHeaderWrapper>
        <h2>{BoardContent?.title}</h2>
        <ul>
          <li>
            <Avatar
              alt={BoardContent?.creator?.nickname}
              src={BoardContent?.creator?.profileImgUrl}
            />
          </li>
          <li style={{ paddingTop: "10px" }}>
            {BoardContent?.creator?.nickname}
          </li>
        </ul>
      </MainHeaderWrapper>
      <MainWrapper>
        <DetailCard sx={{ width: "50ch" }}>
          <CardContent>
            <h3>주제</h3>
            <p>{BoardContent?.topic}</p>
          </CardContent>
        </DetailCard>
        <DetailCard sx={{ width: "50ch" }}>
          <CardContent>
            <h3>현인원/총인원</h3>
            <p>
              {BoardContent?.joinCount}/{BoardContent?.headCount}
            </p>
          </CardContent>
        </DetailCard>
        <DetailCard sx={{ width: "50ch" }}>
          <CardContent>
            <h3>진행상태</h3>
            <p>
              스터디 진행 상태: {StudyStatus.study[BoardContent?.studyState]}
            </p>
            <p>
              스터디 모집 상태: {StudyStatus.recruit[BoardContent?.recruitState]}
            </p>
          </CardContent>
        </DetailCard>
        <DetailCard sx={{ width: "50ch" }}>
          <CardContent>
            <h3>스터디 원들</h3>
            {BoardContent?.studyMembers?.map((m) => {
              const { nickname, profileImgUrl } = m;
              const target = profileImgUrl.split('\\');
              return (
                <AvatarWrapper key={nickname} >
                  <Avatar alt={nickname} src={target[0][0] === '/' ? target[0]: `/${target[target.length-1]}`}/>
                  <span>{nickname}</span>
                </AvatarWrapper>
              );
            })}
          </CardContent>
        </DetailCard>
        <DetailCard sx={{ width: "100ch", marginBottom: "20px" }}>
          <CardContent>
            <h3>내용</h3>
            <h4>{BoardContent?.content}</h4>
          </CardContent>
        </DetailCard>
      </MainWrapper>

      <ButtonWrapper>
        {isLogin ? (
          isClosed ? (
            <h3>마감되었습니다!</h3>
          ) : IsAlreadyJoined ? (
            <button name="Direct" onClick={BoardDetailHandler}>
              바로가기
            </button>
          ) : (
            <button onClick={BoardDetailHandler} name="Join">
              신청하기
            </button>
          )
        ) : (
          <h3>로그인 해주세요!</h3>
        )}
      </ButtonWrapper>
    </>
  );
}

export default BoardDetail;
