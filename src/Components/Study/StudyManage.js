import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../Modal/Modal";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import {
  getBoardCategory,
  createBoardCategory,
  getStudyMembers,
  grantStudyMember,
  rejectStudyMember,
} from "../../Api/Api";
//import { useSelector } from "react-redux";
import { getCookie } from "../../utils/cookie";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { StyledModal, Backdrop, Boxstyle } from "./BoardDetail";

const StudyManageContainer = styled.section`
  width: 100%;
  margin: 3rem 0;
`;
const StudyMemberManageContainer = styled.section`
  width: 70%;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  box-shadow: 0 0 10px -1px rgba(0, 0, 0, 0.2);
  h2 {
    margin: 0;
  }
  div {
    border-bottom: 1px solid #e6e6e6;
  }
`;

const StudyControlContainer = styled(StudyMemberManageContainer)`
  margin-top: 1rem;
`;

const StudyBoardManageContainer = styled(StudyMemberManageContainer)`
  margin-top: 1rem;
`;

const StudyModal = styled.section`
  padding: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const ApplicantStyle = styled.span`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

function StudyManage() {
  const [IsBoardModalUp, setIsBoardModalUp] = useState(false);
  const { studyId } = useParams();
  const queryClient = useQueryClient();
  const [isApplyModalUp, setisApplyModalUp] = useState(false);
  const [ApplyInfo, setApplyInfo] = useState({
    memberId: "",
    applyContent: "",
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      BoardTitle: "",
    },
  });

  const { data: Members } = useQuery(
    ["studyMembers", studyId],
    () => getStudyMembers(studyId, getCookie("accessToken")),
    {
      select: (x) => x.data.data,
      onSuccess: () => {
        console.log(Members);
      },
      retry: false,
    }
  );

  const grantUserMutation = useMutation(
    (memberId) => grantStudyMember(studyId, memberId, getCookie("accessToken")),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["studyMembers", studyId]);
      },
    }
  );

  const rejectUserMutation = useMutation(
    (memberId) =>
      rejectStudyMember(studyId, memberId, getCookie("accessToken")),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["studyMembers", studyId]);
      },
    }
  );

  const { data: board } = useQuery(
    ["boardManage", studyId],
    () => getBoardCategory(studyId, getCookie("accessToken")),
    {
      select: (x) => x.data.data,
      retry: false,
    }
  );

  const AddBoardMutation = useMutation(
    (title) => createBoardCategory(studyId, title, getCookie("accessToken")),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["boardManage", studyId]);
        queryClient.invalidateQueries(["getBoardCategory", studyId]);
      },
    }
  );

  const ModalUpHandler = () => {
    //모달 핸들러
    setIsBoardModalUp(true);
  };

  const BoardAddHandler = (data) => {
    let { BoardTitle } = data;
    AddBoardMutation.mutate(BoardTitle);
    reset({ BoardTitle: "" });
    setIsBoardModalUp(false);
  };

  return (
    <>
      <StudyManageContainer>
        <StudyMemberManageContainer>
          <h2>스터디원 관리</h2>
          <div>
            <p>스터디원들</p>
            {Members?.map((Member) => {
              const { studyRole } = Member;
              if (studyRole !== "APPLY") {
                return (
                  <React.Fragment key={Member.id}>
                    <div>
                      <span>{Member.name}</span>
                      <span>{Member.studyRole}</span>
                    </div>
                  </React.Fragment>
                );
              }
              return null;
            })}
          </div>
          <div>
            <p>지원자</p>
            {Members?.map((Member) => {
              const { studyRole } = Member;
              if (studyRole === "APPLY") {
                return (
                  <React.Fragment key={Member.id}>
                    <div>
                      <ApplicantStyle
                        onClick={() => {
                          setisApplyModalUp(true);
                          setApplyInfo({
                            memberId: Member.id,
                            applyContent: Member.applyContent,
                          });
                        }}
                      >
                        {Member.name}
                      </ApplicantStyle>
                      <span>{Member.studyRole}</span>
                    </div>
                  </React.Fragment>
                );
              }
              return null;
            })}
          </div>
        </StudyMemberManageContainer>
        {IsBoardModalUp && (
          <StudyModal>
            <Modal
              title={<h2 style={{ margin: "0" }}>게시판 추가</h2>}
              closeButton={
                <CloseIcon onClick={() => setIsBoardModalUp(false)}>
                  닫기
                </CloseIcon>
              }
              ModalHandler={() => setIsBoardModalUp(false)}
            >
              <div>
                <form onSubmit={handleSubmit(BoardAddHandler)}>
                  <input
                    type="text"
                    placeholder="제목"
                    {...register("BoardTitle", {
                      required: "입력해 주세요!",
                      minLength: {
                        value: 2,
                        message: "2자리 이상으로 입력해 주세요!",
                      },
                    })}
                  />
                  <ErrorMessage>{errors?.BoardTitle?.message}</ErrorMessage>
                  <Button variant="contained" type="submit">
                    게시판 추가
                  </Button>
                </form>
              </div>
            </Modal>
          </StudyModal>
        )}
        <StudyBoardManageContainer>
          <h2>게시판 관리</h2>
          <ul>
            {board?.map((b) => (
              <li key={b.studyBoardId}>{b.title}</li>
            ))}
          </ul>
          <Button variant="contained" onClick={ModalUpHandler}>
            게시판 추가
          </Button>
        </StudyBoardManageContainer>
        <StudyControlContainer>
          <h2>스터디 관리</h2>
          <Button variant="contained" color="error" onClick={ModalUpHandler}>
            스터디 삭제
          </Button>
        </StudyControlContainer>
      </StudyManageContainer>
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
          <h2 id="styled-modal-title">지원서</h2>
          <p id="styled-modal-description">작성한 지원서</p>
          <hr />
          <p>
            {ApplyInfo?.applyContent === '' ? '지원서 내용을 작성해주시지 않았어요 ㅠㅠ.' : ApplyInfo?.applyContent}
          </p>
          <button
            onClick={() => {
              window.confirm("승인하시겠습니까?") &&
                grantUserMutation.mutate(ApplyInfo?.memberId);
              setisApplyModalUp(false);
            }}
          >
            승인
          </button>
          <button
            onClick={() => {
              window.confirm("거절하시겠습니까?") &&
                rejectUserMutation.mutate(ApplyInfo?.memberId);
              setisApplyModalUp(false);
            }}
          >
            거절
          </button>
        </Box>
      </StyledModal>
    </>
  );
}

export default StudyManage;
