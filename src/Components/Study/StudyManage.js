import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../Modal/Modal";
import MuiDialog from "../Modal/MuiDialog";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import {
  getBoardCategory,
  createBoardCategory,
  getStudyMembers,
  grantStudyMember,
  rejectStudyMember,
  deleteBoard,
  updateBoardCategory,
  deleteBoardCategory,
} from "../../Api/Api";
//import { useSelector } from "react-redux";
import { getCookie } from "../../utils/cookie";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { StyledModal, Backdrop, Boxstyle } from "./BoardDetail";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { FormControl, Paper } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

const StudyManageContainer = styled.section`
  width: 80vw;
  margin: 3rem auto;
`;
const StudyMemberManageContainer = styled.section`
  width: 70%;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  box-shadow: 0 0 10px -1px rgba(0, 0, 0, 0.2);
  h2 {
    margin: 0;
  }
  .MemberList {
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  .ApplyListWrapper {
    padding: 1rem 0;
    .ApplyList {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
`;

const StudyMemberContainer = styled.div`
  .StudyMemberWrapper {
    display: flex;
    justify-content: space-between;
    span {
      &:first-child {
        font-size: 1rem;
      }
      &:last-child {
        font-size: 0.8rem;
        background: #dbeafe;
        padding: 0.5rem 1rem;
        border-radius: 5px;
      }
    }
  }
`;

const StudyControlContainer = styled(StudyMemberManageContainer)`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    gap: 10px;
    button {
      padding: .3rem .5rem;
      &:first-child {
        background: #0049a4;
        transition: all 0.3s linear;
        &:hover {
          background: #ffC107;
          transition: all 0.3s linear;
        }
      }
      &:last-child {
        transition: all 0.3s linear;
        &:hover {
          background: #ff7675;
          transition: all 0.3s linear;
        }
      }
    }
  }

`;

const StudyBoardManageContainer = styled(StudyMemberManageContainer)`
  margin-top: 1rem;
  .BoardManageHeader {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    button {
      font-size: 0.8rem;
      border: 0;
      background: #0049af;
      color: white;
      padding: 0.3rem 0.5rem;
      border-radius: 5px;
      transition: all 0.2s linear;
      &:hover {
        cursor: pointer;
        background: #ffc107;
        transition: all 0.2s linear;
      }
    }
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const StudyModal = styled.section`
  padding: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const ApplicantStyle = styled.span`
  div {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
    display: flex;
  }
`;

const BoardCatergoryWrapper = styled.li`
  &:hover {
    cursor: pointer;
    color: #0049af;
  }
`;

const ApplyerBox = styled(Box)`
  width: 40vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  padding: 1rem 2rem;
  background-color: white;
  gap: 1rem;
  border: 0;
  p {
    white-space: pre-line;
  }
  div {
    &:last-child {
      align-self: flex-end;
      display: flex;
      gap: 10px;
      button {
        &:hover {
          cursor: pointer;
        }
        padding: 0.5rem 1rem;
        border-radius: 5px;
        color: white;
        border: 0;
        &:first-child {
          background-color: #0049af;
          transition: 0.3s all linear;
          &:hover {
            background-color: #ffc107;
            transition: 0.3s all linear;
          }
        }
        &:last-child {
          background-color: #d63031;
          transition: 0.3s all linear;
          &:hover {
            background-color: #ff7675;
            transition: 0.3s all linear;
          }
        }
      }
    }
  }
`;

const CategoryChangeModal = styled.div`
  padding: 16px 24px;
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .contents {
      display: flex;
      align-items: center;
      align-self: center;
      gap: 1rem;
      font-size: 1.8rem;
    }
    .Action {
      align-self: flex-end;
      display: flex;
      gap: 10px;
      button {
        &:hover {
          cursor: pointer;
          transition: 0.3s all linear;
          &:first-child {
            background-color: #ffc107;
          }
          &:last-child {
            background-color: #ff7675;
          }
        }
        padding: 0.5rem 1rem;
        border: 0;
        border-radius: 5px;
        color: white;
        &:first-child {
          background-color: #0049af;
        }
        &:last-child {
          background-color: #d63031;
        }
      }
    }
  }
`;

function StudyManage() {
  const [IsBoardModalUp, setIsBoardModalUp] = useState(false);
  const [isBoardCategoryModalUp, setIsBoardCategoryModalUp] = useState(false);
  const [boardCategoryName, setBoardCategoryName] = useState("");
  const [boardCategoryId, setBoardCategoryId] = useState(0);
  const { studyId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isApplyModalUp, setisApplyModalUp] = useState(false);
  const [ApplyInfo, setApplyInfo] = useState({
    memberId: "",
    applyContent: "",
  });
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

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm();

  const { data: Members } = useQuery(
    ["studyMembers", studyId],
    () => getStudyMembers(studyId, getCookie("accessToken")),
    {
      select: (x) => x.data.data,
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

  const deleteBoardMutation = useMutation(
    () => deleteBoard(studyId, getCookie("accessToken")),
    {
      onSuccess: () => {
        navigate("/study");
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

  const updateBoardCategoryMutation = useMutation(
    ({ newTitle, boardId }) =>
      updateBoardCategory(studyId, boardId, newTitle, getCookie("accessToken")),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["boardManage", studyId]);
        queryClient.invalidateQueries(["getBoardCategory", studyId]);
      },
    }
  );

  const deleteBoardCategoryMutation = useMutation(
    () =>
      deleteBoardCategory(studyId, boardCategoryId, getCookie("accessToken")),
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
    console.log(data);
    let { BoardTitle } = data;
    AddBoardMutation.mutate(BoardTitle);
    reset({ BoardTitle: "" });
    setIsBoardModalUp(false);
  };

  const updateStudyHandler = () => {
    navigate(`/study/${studyId}/edit`);
  };

  const updateStudyBoardCategoryHandler = (data) => {
    updateBoardCategoryMutation.mutate({
      newTitle: data.newBoardCategory,
      boardId: boardCategoryId,
    });
    setIsBoardCategoryModalUp(false);
  };

  const deleteStudyBoardCategoryHandler = () => {
    window.confirm("삭제하시겠습니까?") && deleteBoardCategoryMutation.mutate();
    setIsBoardCategoryModalUp(false);
  };

  return (
    <>
      <StudyManageContainer>
        <StudyMemberManageContainer>
          <h2>스터디원 관리</h2>
          <div>
            <h3>구성원</h3>
            <div className="MemberList">
              {Members?.map((Member) => {
                const { studyRole } = Member;
                if (studyRole !== "APPLY") {
                  return (
                    <StudyMemberContainer key={Member.id}>
                      <div className="StudyMemberWrapper">
                        <span>{Member.name}</span>
                        <span>{Member.studyRole}</span>
                      </div>
                    </StudyMemberContainer>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <div className="ApplyListWrapper">
            <h3>지원자</h3>
            <div className="ApplyList">
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
                          <div>{Member.name}</div>
                        </ApplicantStyle>
                      </div>
                    </React.Fragment>
                  );
                }
                return null;
              })}
            </div>
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
                  <Button type="submit">게시판 추가</Button>
                </form>
              </div>
            </Modal>
          </StudyModal>
        )}
        <StudyBoardManageContainer>
          <div className="BoardManageHeader">
            <h2>게시판 관리</h2>
            <button onClick={ModalUpHandler}>추가</button>
          </div>
          <ul>
            {board?.map((b) => (
              <BoardCatergoryWrapper
                onClick={() => {
                  setIsBoardCategoryModalUp(true);
                  setBoardCategoryName(b.title);
                  setBoardCategoryId(b.studyBoardId);
                }}
                key={b.studyBoardId}
              >
                {b.title}
              </BoardCatergoryWrapper>
            ))}
          </ul>
        </StudyBoardManageContainer>
        <StudyControlContainer>
          <h2>스터디 관리</h2>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={updateStudyHandler}
            >
              스터디 수정
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                if (window.confirm("정말 삭제하시겠습니까?")) {
                  deleteBoardMutation.mutate();
                }
              }}
            >
              스터디 삭제
            </Button>
          </div>
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
        <ApplyerBox>
          <div>
            <h2 id="styled-modal-title">지원서</h2>
            <p id="styled-modal-description">작성한 지원서</p>
          </div>
          <div>
            <p>
              {ApplyInfo?.applyContent === ""
                ? "지원서 내용을 작성해주시지 않았어요 ㅠㅠ."
                : ApplyInfo?.applyContent}
            </p>
          </div>
          <div>
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
          </div>
        </ApplyerBox>
      </StyledModal>
      <MuiDialog
        open={isBoardCategoryModalUp}
        onClose={() => setIsBoardCategoryModalUp(false)}
        title="게시판 관리"
      >
        <CategoryChangeModal>
          <form onSubmit={handleSubmit2(updateStudyBoardCategoryHandler)}>
            <div className="contents">
              <span>{boardCategoryName}</span>
              <ArrowCircleRightIcon />
              <FormControl>
                <InputLabel id="new-board-categories">
                  새로운 게시판 이름
                </InputLabel>
                <OutlinedInput
                  label="새로운 게시판 이름"
                  id="new-board-categories"
                  {...register2("newBoardCategory", {
                    required: "한글자라도 입력해주세요!",
                  })}
                />
              </FormControl>
            </div>
            <div className="Action">
              <button type="submit">수정</button>
              <button type="button" onClick={deleteStudyBoardCategoryHandler}>
                삭제
              </button>
            </div>
          </form>
          {errors2?.newBoardCategory?.message}
        </CategoryChangeModal>
      </MuiDialog>
    </>
  );
}

export default StudyManage;
