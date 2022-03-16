import React, { useEffect, useState } from "react";
import { findBoard, join, getBoardCategory, getStudyMembers } from "../../Api/Api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams, Link } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { Box } from "@mui/system";
import { TextareaAutosize } from "@mui/base";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { MemberLink } from "../Style/MemberLink";

const defaultProfileImgUrl =
  "https://koner-bucket.s3.ap-northeast-2.amazonaws.com/profileImg/koryong1.jpg";

const MainHeaderWrapper = styled.header`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-family: "OTWelcomeBA", sans-serif;
  font-size: 2rem;
  padding-top: 20px;
  background: white;
  background-image: url(${(props) => props.backgroundImg});
  background-position: center;
  background-repeat: no-repeat;
  height: 10vh;
`;

const MainWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, 1fr));
  grid-tmpate-rows: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  row-gap: 20px;
  column-gap: 10px;
  padding: 0 20px;
  padding: 20px 0;
  @media (min-width: 461px) and (max-width: 860px) {
    grid-template-columns: repeat(1, minmax(300px, 1fr));
    .jend {
      width: 50ch;
      justify-self: center !important;
    }
  }
  @media (max-width: 460px) {
    grid-template-columns: repeat(1, 1fr);
    .jend {
      width: 30ch;
      justify-self: center !important;
    }
  }
  .jend {
    justify-self: end;
  }
`;

const DetailCard = styled(Card)`
  .Stitle {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.3rem;
      }
      img {
        transform: scale(0.7);
        border-radius: 50%;
      }
    }
  }
  &:first-child {
    grid-area: 1 / 1 / span 1 / -1;
    justify-self: center;
  }
  &:last-child {
    grid-area: 4 / 1 / span 1 / -1;
    justify-self: center;
  }
  @media (min-width: 861px) and (max-width: 1350px) {
    &:first-child,
    &:last-child {
      width: calc(80vw + 10px) !important;
    }
    width: 40vw !important;
  }
  @media (max-width: 860px) {
    justify-self: center;
    width: 80vw !important;
  }
`;

const AvatarWrapper = styled.div`
  margin-top: 1rem;
  display: inline-flex;
  a {
    display: flex;
    align-items: center;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Backdrop = styled.div`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Boxstyle = {
  width: 400,
  bgcolor: "white",
  p: 2,
  px: 4,
  pb: 3,
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: "1rem",
};

const StudyStatusWrapper = styled.span`
  background: #d0fae4;
  padding: 5px;
  border-radius: 5px;
  color: #339667;
  margin-right: 10px;
  margin-top: 5px;
  &:last-child {
    margin-right: 0;
  }
  font-family: "SEBANG_Gothic_Bold", sans-serif;
`;

const StyledTextarea = styled(TextareaAutosize)`
  outline-color: blue;
`;

const DirectButton = styled.button`
  background-color: #0049af;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 5px 20px;
  cursor: pointer;
  font-size: 1.8rem;
  font-family: "SEBANG_Gothic_Bold", sans-serif;
  transition: all 0.3s linear;
  &:hover {
    background-color: #ffbe58;
    transition: all 0.3s linear;
  }
  margin-bottom: 2rem;
`;

export const TagsWrapper = styled.ul`
  margin-top: 1rem;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15%, auto));
  grid-gap: 10px;
  padding: 0;
  justify-content: start;
  li {
    background: #6495ed;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: "SEBANG_Gothic_Bold", sans-serif;
    }
  }
`;

export const StatusWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  p {
    align-self: flex-start;
    padding: 0.3rem 0.5rem;
    border-radius: 5px;
    font-family: "SEBANG_Gothic_Bold", sans-serif;
    &:first-child {
      background-color: #9f9ef4;
      color: white;
      margin-bottom: 10px;
    }
    &:last-child {
      background-color: #e97d87;
      color: white;
    }
  }
`;

const CurrentMemberWrapper = styled.div`
  p {
    font-family: "SEBANG_Gothic_Bold", sans-serif;
    font-size: 2rem;
    margin-top: 1rem;
  }
`;

const ApplyForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  button {
    align-self: flex-end;
  }
`;



function BoardDetail({ boardId }) {
  const navigate = useNavigate();
  const params = useParams();
  const { isChecked, isLogin, id, nickname } = useSelector(
    (state) => state.users
  );
  const [IsAlreadyJoined, setIsAlreadyJoined] = useState(false);
  const [isClosed, setisClosed] = useState(false);
  const [isApply, setIsApply] = useState(false);
  const [JoinCnt, setJoinCnt] = useState(0);
  const [isApplyModalUp, setisApplyModalUp] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const myinfoData = queryClient.getQueryData('MyInfo');

  const { data: board } = useQuery(
    ["board", params.boardId],
    () => getBoardCategory(params.boardId, getCookie("accessToken")),
    {
      select: (x) => x.data.data,

      onError: (err) => console.log(err),
      enabled: isLogin,
    }
  );
  const applyMutation = useMutation(
    ["apply", params.boardId],
    (applyContent) =>
      join(params.boardId, id, applyContent, getCookie("accessToken")),
    {
      onSuccess: () => {
        setIsApply(true);
        queryClient.invalidateQueries(["board", params.boardId]);
      },
    }
  );

  const { data: BoardContent } = useQuery(
    ["boardContent", params.boardId],
    () => findBoard(params.boardId),
    {
      select: (x) => x.data.data,
      retry: false,
    }
  );

  const { data: BoardMember } = useQuery(['loadBoardMembers', params.boardId], () => getStudyMembers(params.boardId), {
    select: (x) => x.data.data,
  });

  useEffect(() => {
    if (BoardContent && BoardMember) {
      let a = BoardMember.length;
      BoardMember?.forEach((member) => {
        const { member:{nickname: Nick, memberId}, studyRole } = member;
        if (id === memberId) {
          if (studyRole === "APPLY") {
            a -= 1;
            setIsApply(true);
            setIsAlreadyJoined(false);
          } else {
            setIsAlreadyJoined(true);
            setIsApply(false);
          }
        } else if (studyRole === "APPLY") {
          a -= 1;
        }
      });
      Number(BoardContent?.headCount) === a && !IsAlreadyJoined
        ? setisClosed(true)
        : setisClosed(false);
      setJoinCnt(a);
    }
  }, [BoardContent, nickname, IsAlreadyJoined, BoardMember]);

  const BoardDetailHandler = (e) => {
    if (isChecked && isLogin) {
      if (e.target.name === "Direct") {
        navigate(
          `/study/${params.boardId}/board/${board[0].id}/articles`
        );
        return;
      }
    }
    navigate("/login");
  };

  const onApplySubmit = (data) => {
    applyMutation.mutate(data.applyContent);
    setisApplyModalUp(false);
  };

  const StudyStatus = {
    study: {
      PREPARE: "스터디 준비중",
      STUDYING: "스터디 진행중",
      FINISH: "스터디 종료",
    },
    recruit: {
      PROCEED: "모집 진행중",
      END: "모집 종료",
    },
    method: {
      FACE: "대면",
      NONFACE: "비대면",
      UNDEFINED: "미정",
    },
  };

  return (
    <>
      <MainHeaderWrapper backgroundImg={BoardContent?.profileImg} />
      <MainWrapper>
        <DetailCard sx={{ width: "calc(100ch + 10px)" }}>
          <CardContent className="Stitle">
            <h2>{BoardContent?.title}</h2>
            <ul>
              <li>
                <Avatar
                  alt={BoardContent?.creator?.nickname}
                  src={
                    BoardContent?.creator?.profileImgUrl === "디폴트이미지 경로"
                      ? defaultProfileImgUrl
                      : BoardContent?.creator?.profileImgUrl
                  }
                />
              </li>
              <li style={{ paddingTop: "10px" }}>
                <MemberLink to={`/userinfo/${BoardContent?.creator?.memberId}`}>{BoardContent?.creator?.nickname}</MemberLink>
              </li>
            </ul>
            <StudyStatusWrapper>
              {StudyStatus.study[BoardContent?.studyState]}
            </StudyStatusWrapper>
            <StudyStatusWrapper>
              {StudyStatus.recruit[BoardContent?.recruitState]}
            </StudyStatusWrapper>
          </CardContent>
        </DetailCard>
        <DetailCard sx={{ width: "50ch" }} className="jend">
          <CardContent>
            <h3>주제</h3>
            <TagsWrapper>
              {BoardContent?.tags?.map((tag, index) => (
                <li key={index}>
                  <p>{tag}</p>
                </li>
              ))}
            </TagsWrapper>
          </CardContent>
        </DetailCard>
        <DetailCard sx={{ width: "50ch" }}>
          <CardContent>
            <CurrentMemberWrapper>
              <h3>현인원/총인원</h3>
              <p>
                {JoinCnt}/{BoardContent?.headCount}
              </p>
            </CurrentMemberWrapper>
          </CardContent>
        </DetailCard>
        <DetailCard sx={{ width: "50ch" }} className="jend">
          <CardContent>
            <h3>상태</h3>
            <StatusWrapper>
              <p>{StudyStatus.method[BoardContent?.studyMethod]}</p>
              <p>
                {BoardContent?.startDate} ~ {BoardContent?.endDate}
              </p>
            </StatusWrapper>
          </CardContent>
        </DetailCard>
        <DetailCard sx={{ width: "50ch" }}>
          <CardContent>
            <h3>스터디 원들</h3>
            {BoardMember?.map((m) => {
              const { member: { nickname: Nick,profileImgUrl,memberId},studyRole } = m;
              if (studyRole === "APPLY") {
                return null;
              }
              return (
                <AvatarWrapper key={memberId}>
                  <Avatar
                    alt={Nick}
                    src={
                      profileImgUrl
                    }
                  />
                  <MemberLink to={`/userinfo/${memberId}`}>{Nick}</MemberLink>
                </AvatarWrapper>
              );
            })}
          </CardContent>
        </DetailCard>
        <DetailCard sx={{ width: "calc(100ch + 10px)", marginBottom: "20px" }}>
          <CardContent>
            <h3>내용</h3>
            <h4 style={{ marginTop: "1rem", whiteSpace: "pre-line" }}>
              {BoardContent?.description}
            </h4>
          </CardContent>
        </DetailCard>
      </MainWrapper>

      <ButtonWrapper>
        {isLogin ? (
          isClosed ? (
            myinfoData?.data.data.authority === 'ROLE_ADMIN' ? (<DirectButton name="Direct" onClick={BoardDetailHandler}>
            바로가기
          </DirectButton>) :  <h3>마감되었습니다!</h3>
          ) : IsAlreadyJoined || myinfoData?.data.data.authority === 'ROLE_ADMIN' ? (
            <DirectButton name="Direct" onClick={BoardDetailHandler}>
              바로가기
            </DirectButton>
          ) : isApply ? (
            <h3>스터디 신청중입니다!</h3>
          ) : (
            <DirectButton
              onClick={() => {
                setisApplyModalUp(true);
              }}
              name="Join"
            >
              신청하기
            </DirectButton>
          )
        ) : (
          <h3>로그인 해주세요!</h3>
        )}
      </ButtonWrapper>
      <StyledModal
        aria-labelledby="styled-modal-title"
        aria-describedby="styled-modal-description"
        open={isApplyModalUp}
        onClose={() => {
          setisApplyModalUp(false);
        }}
        BackdropComponent={Backdrop}
      >
        <Box sx={Boxstyle}>
          <div>
            <h2 id="styled-modal-title">지원서 작성하기</h2>
            <p id="styled-modal-description">
              스터디에 입장하기 위해 지원서를 쓰고 대기해 주세요!
            </p>
          </div>
          <ApplyForm onSubmit={handleSubmit(onApplySubmit)}>
            <StyledTextarea
              {...register("applyContent")}
              aria-label="minimum height"
              minRows={10}
              placeholder="지원서 작성하기"
              style={{ width: "100%" }}
            />
            <DirectButton type="submit">지원하기</DirectButton>
          </ApplyForm>
        </Box>
      </StyledModal>
    </>
  );
}

export default BoardDetail;
