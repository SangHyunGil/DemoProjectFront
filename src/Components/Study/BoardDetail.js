import React, { useEffect, useState } from "react";
import {
  findBoard,
  join,
  getBoardCategory,
  getStudyMembers,
} from "../../Api/Api";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { updateStudyIds } from "../../reducers/users";
import { useQuery , useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Box } from '@mui/system';
import { TextareaAutosize } from '@mui/base';
import styled from "styled-components";
import {useForm} from "react-hook-form";

const MainHeaderWrapper = styled.header`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-family: "OTWelcomeBA", sans-serif;
  font-size: 2rem;
  padding-top: 20px;
  background: white;
  background-image: url(${props => props.backgroundImg});
  background-size: cover;
  background-position: center;
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
  padding: 20px 0;
  @media (max-width: 860px) {
    grid-template-columns: repeat(1, minmax(300px, 1fr));
  }
`;

const DetailCard = styled(Card)`
  display: inline-block;
  &:nth-child(odd) {
    justify-self: end;
    @media (max-width: 860px) {
      width: 60%;
      justify-self: center;
    }
  }
  &:nth-child(2n) {
    justify-self: start;
    @media (max-width: 860px) {
      justify-self: center;
      width: 60%;
    }
  }
  &:last-child {
    justify-self: center;
    grid-column: span 2;
    @media (max-width: 860px) {
      width: 60%;
      grid-column: 1 / span 1;
    }
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
  bgcolor: 'white',
  p: 2,
  px: 4,
  pb: 3,
  borderRadius: '10px',
};

const StyledTextarea = styled(TextareaAutosize)`
  outline-color: blue;
`;


function BoardDetail({boardId}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { isChecked, isLogin, id, accessToken, studyInfos, nickname } =
    useSelector((state) => state.users);
  const [IsAlreadyJoined, setIsAlreadyJoined] = useState(false);
  const [isClosed, setisClosed] = useState(false);
  const [isApply, setIsApply] = useState(false);
  const [JoinCnt, setJoinCnt] = useState(0);
  const [isApplyModalUp, setisApplyModalUp] = useState(false);
  const [backGroundImg, setbackGroundImg] = useState('');
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
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
    (applyContent)=> join(params.boardId, id, applyContent, getCookie("accessToken")),
    {
      onSuccess: () => {
        setIsApply(true);
        queryClient.invalidateQueries(["board", params.boardId]);
      }
    }
  );

  const { data: BoardContent } = useQuery(
    ["boardContent", params.boardId],
    () => findBoard(params.boardId),
    {
      select: (x) => x.data.data,
      onSuccess: (data) => {
        const {profileImg} = data;
        const SpiltedprofileImgUrl = profileImg.split("/").reverse();
        SpiltedprofileImgUrl[0].startsWith("/") ? setbackGroundImg(SpiltedprofileImgUrl[0]) : setbackGroundImg(`/profile/${SpiltedprofileImgUrl[0].split('\\').reverse()[0]}`);
      },
      retry: false,
    }
  );

  useEffect(() => {
    if(BoardContent){
      let a = BoardContent?.joinCount;
      BoardContent?.studyMembers?.forEach((member) => {
        const { nickname: Nick, studyRole } = member;
        if (nickname === Nick) {
          if (studyRole === "APPLY") {
            a -= 1;
            setIsApply(true);
            setIsAlreadyJoined(false);
          } else {
            setIsAlreadyJoined(true);
            setIsApply(false);
          }
        }
        else if (studyRole === "APPLY") {
          a -= 1;
        }
      });
      Number(BoardContent?.headCount) === a &&
      !IsAlreadyJoined
        ? setisClosed(true)
        : setisClosed(false);
      setJoinCnt(a);
    }
  },[BoardContent, nickname, IsAlreadyJoined]);

  const BoardDetailHandler = (e) => {
    if (isChecked && isLogin) {
      if (e.target.name === "Direct") {
        navigate(
          `/study/${params.boardId}/board/${board[0].studyBoardId}/articles`
        );
        return;
      }
    }
    navigate("/login");
  };

  const onApplySubmit = (data) => {
    applyMutation.mutate(data.applyContent);
    setisApplyModalUp(false);
  }

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
    method: {
      FACE: "대면",
      NONFACE: "비대면",
      UNDEFINED: "미정",
    },
  };

  return (
    <>
      <MainHeaderWrapper backgroundImg={backGroundImg}>
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
            <p>{BoardContent?.tags}</p>
          </CardContent>
        </DetailCard>
        <DetailCard sx={{ width: "50ch" }}>
          <CardContent>
            <h3>현인원/총인원</h3>
            <p>
              {JoinCnt}/{BoardContent?.headCount}
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
              스터디 모집 상태:{" "}
              {StudyStatus.recruit[BoardContent?.recruitState]}
            </p>
            <p>
              스터디 모집 방법: {StudyStatus.method[BoardContent?.studyMethod]}
            </p>
          </CardContent>
        </DetailCard>
        <DetailCard sx={{ width: "50ch" }}>
          <CardContent>
            <h3>스터디 원들</h3>
            {BoardContent?.studyMembers?.map((m) => {
              const { nickname: Nick, profileImgUrl, studyRole } = m;
              if (studyRole === "APPLY") {
                return null;
              }
              const target = profileImgUrl.split("\\");
              return (
                <AvatarWrapper key={Nick}>
                  <Avatar
                    alt={Nick}
                    src={
                      target[0][0] === "/"
                        ? target[0]
                        : `/${target[target.length - 1]}`
                    }
                  />
                  <span>{Nick}</span>
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
          ) : isApply ? (
            <h3>스터디 신청중입니다!</h3>
          ) : (
            <button onClick={()=>{setisApplyModalUp(true)}} name="Join">
              신청하기
            </button>
          )
        ) : (
          <h3>로그인 해주세요!</h3>
        )}
      </ButtonWrapper>
      <StyledModal
      aria-labelledby="styled-modal-title"
      aria-describedby="styled-modal-description"
      open={isApplyModalUp}
      onClose={()=>{setisApplyModalUp(false)}}
      BackdropComponent={Backdrop}
      >
        <Box sx={Boxstyle}>
          <h2 id="styled-modal-title">지원서 작성하기</h2>
          <p id="styled-modal-description">스터디에 입장하기 위해 지원서를 쓰고 대기해 주세요!</p> 
          <form onSubmit={handleSubmit(onApplySubmit)}>
            <StyledTextarea {...register("applyContent")}
              aria-label="minimum height"
              minRows={10}
              placeholder="지원서 작성하기"
              style={{ width: '80%' }}
            />
            <button type="submit">지원하기</button>
          </form>
        </Box>
      </StyledModal>
    </>
  );
}

export default BoardDetail;
