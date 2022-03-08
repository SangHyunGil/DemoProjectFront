import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getArticlePost,
  findUserBoard,
  deleteBoardArticle,
  getAllComments,
  createComment,
  deleteComment,
  updateComment,
  getStudyMembers
} from "../../Api/Api";
import { getCookie } from "../../utils/cookie";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ArticleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  .ArticleContainer {
    padding: 1rem 2rem;
    flex-basis: 60%;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    @media (max-width: 560px) {
      flex-basis: 100%;
      box-shadow: none;
    }
    header {
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      .ArticleTitle {
        display: flex;
        justify-content: space-between;
        .ArticleAction {
          display: flex;
          gap: 1rem;
          a {
            text-decoration: none;
            color: white;
            background-color: #0049af;
            border-radius: 5px;
            padding: 0.3rem 0.6rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          button {
            background-color: #e74c3c;
            border: 0;
            border-radius: 5px;
            padding: 0.3rem 0.6rem;
            color: white;
          }
        }
      }
      .ArticleSubInfo {
        display: flex;
        flex-direction: column;
      }
    }
    main {
      padding: 2rem 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
    .Reply {
      form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        .ReplyInput {
          margin: 10px 0;
          width: 100%;
        }
        button {
          align-self: flex-end;
          background-color: #0049af;
          border: 0;
          color: white;
          border-radius: 5px;
          padding: 1rem 1.5rem;
          font-size: 1.2rem;
          font-weight: bolder;
          transition: all 0.3s linear;
          &:hover {
            cursor: pointer;
            background-color: #ffc107;
            transition: all 0.3s linear;
          }
        }
      }
    }
    .CommentList {
      h2 {
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      }
      .Comment {
        padding: 1rem 0;
        .CommentHeader {
          display: flex;
          justify-content: space-between;
          .CommentTitle {
            display: flex;
            align-items: center;
            gap: 1rem;
            span {
              font-weight: bolder;
              font-size: 1.2rem;
            }
          }
          .CommentAction {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
        }
        .Comment-content {
          padding: 1rem 0;
          white-space: pre-line;
          font-family: 'NEXON Lv2 Gothic', sans-serif;
        }
        .Comment-reply {
          .CommentReplyAccordion {
            background: rgb(249, 250, 251);
            .CommentReplyContent {
              .CommentReplyFormButton {
                padding-top: 1rem;
                border: 0;
                background: transparent;
                .FormClose {
                  color: red;
                }
                .FormOpen {
                  color: #0049af;
                }
                &:hover {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CommentsReplyStyle = styled.form`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .CommentReplyInput {
    width: 100%;
  }
  button {
    border: 0;
    background-color: #0049af;
    color: white;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    align-self: flex-end;
    transition: all 0.3s linear;
    &:hover {
      cursor: pointer;
      background-color: #ffc107;
      transition: all 0.3s linear;
    }
  }
`;
const CommentsReplyContentStyle = styled.div`
  .CommentReplyContentWrapper {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    .CommentReplyContentHeader {
      display: flex;
      align-items: center;
      font-weight: bolder;
    }
    .CommentReplyContentMain {
      p {
        font-family: 'Galmuri9', sans-serif;
        white-space: pre-line;
      }
    }
    .CommentReplyContentAction {
      align-self: flex-end;
      display: flex;
      gap: 1rem;
      button {
        border: 0;
        background-color: transparent;
        color: #1976d2;
        &:hover {
          cursor: pointer;
          background-color: #F6FAFD;
        }
      }
    }
  }
`;

const CommentUpdateForm = styled.form`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    justify-content: flex-end;
  }
`;

function BoardArticlesPost() {
  const [replyComments, setreplyComments] = useState({
    id: "",
    replyFormVisible: false,
    variant: "reply",
  });
  const [isCommentUpdateForm,setIsCommentUpdateForm] = useState({
    id: 0,
    updateFormVisible: false,
  });
  const [myInfo, setMyInfo] = useState(null);
  const { studyId, boardId, articleId } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const {
    register: secondRegister,
    handleSubmit: secondHandleSubmit,
    setValue: secondSetValue,
  } = useForm();
  const {
    register: updateRegister,
    handleSubmit: updateHandleSubmit,
    setValue: updateSetValue,
  } = useForm();
  const {
    register: updateSecondRegister,
    handleSubmit: updateSecondHandleSubmit,
    setValue: updateSecondSetValue,
  } = useForm();
  const queryClient = useQueryClient();
  const { id, nickname } = useSelector((state) => state.users);
  //console.log(id);
  const {data:studyMembers} = useQuery(['getStudyMembers',studyId,boardId,articleId],()=>getStudyMembers(studyId),{
    select: (data) => data.data.data,
    onSuccess: (data) => {
      setMyInfo(data.find((member) => member.nickname === nickname));
    }
  });
  //const myInfo = studyMembers.find((member) => member.nickname === nickname);
  const { data: article } = useQuery(
    ["Post", studyId, boardId, articleId],
    () => getArticlePost(studyId, boardId, articleId, getCookie("accessToken")),
    {
      select: (x) => x.data.data,
    }
  );
  const { data: userInfo } = useQuery(
    ["User", studyId, boardId, articleId],
    () => findUserBoard(getCookie("accessToken")),
    {
      select: (x) => x.data.data,
      onSuccess: (x) => {
        console.log(x);
      },
    }
  );

  const { data: comments } = useQuery(
    ["Comments", studyId, boardId, articleId],
    () => getAllComments(studyId, boardId, articleId, getCookie("accessToken")),
    {
      select: (x) => x.data.data,
      onSuccess: (x) => {
        console.log(x);
      },
    }
  );

  const deleteArticlePostMutation = useMutation(
    () =>
      deleteBoardArticle(studyId, boardId, articleId, getCookie("accessToken")),
    {
      onSuccess: () => {
        navigate(`/study/${studyId}/board/${boardId}/articles`);
      },
    }
  );

  const CommentMutation = useMutation(
    (content) =>
      createComment(
        studyId,
        boardId,
        articleId,
        { content, memberId: id, parentCommentId: replyComments.id },
        getCookie("accessToken")
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "Comments",
          studyId,
          boardId,
          articleId,
        ]);
      },
    }
  );

  const DeleteCommentMutation = useMutation(
    (commentId) =>
      deleteComment(
        studyId,
        boardId,
        articleId,
        commentId,
        getCookie("accessToken")
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "Comments",
          studyId,
          boardId,
          articleId,
        ]);
      },
    }
  );

  const UpdateCommentMutation = useMutation(
    ({ commentId, content }) =>
      updateComment(
        studyId,
        boardId,
        articleId,
        commentId,
        content,
        getCookie("accessToken")
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "Comments",
          studyId,
          boardId,
          articleId,
        ]);
      },
    }
  );

  const deleteArticlePostHandler = () => {
    deleteArticlePostMutation.mutate();
  };

  const replyHandler = (data) => {
    setreplyComments((prev) => ({ ...prev, id: null }));
    CommentMutation.mutate(data.comment);
    setValue("comment", "");
  };

  const commentReplyHandler = (data) => {
    console.log(data.commentReply);
    replyComments.variant === "reply"
      ? CommentMutation.mutate(data.commentReply)
      : UpdateCommentMutation.mutate({
          commentId: replyComments.id,
          content: data.commentReply,
        });
    secondSetValue("commentReply", "");
    setreplyComments((prev) => ({ ...prev, replyFormVisible: false }));
  };

  const commentReplyUpdateHandler = (data) => {
    UpdateCommentMutation.mutate({
      commentId: replyComments.id,
      content: data.commentReplyUpdate,
    });
    updateSetValue("commentReplyUpdate", "");
    setreplyComments((prev) => ({ ...prev, replyFormVisible: false }));
  };

  const deleteCommentHandler = (commentId) => {
    DeleteCommentMutation.mutate(commentId);
  };

  const commentUpdateHandler = (data) => {
    UpdateCommentMutation.mutate({
      commentId: isCommentUpdateForm.id,
      content: data.commentUpdate,
    });
    updateSecondSetValue("commentUpdate", "");
    setIsCommentUpdateForm((prev) => ({ ...prev, updateFormVisible: false }));
  };

  return (
    <ArticleWrapper>
      <div className="ArticleContainer">
        <header>
          <div className="ArticleTitle">
            <h1>{article?.title}</h1>
            {(myInfo?.studyRole === "ADMIN" ||
              myInfo?.studyRole === "CREATOR" ||
              userInfo?.member?.nickname === article?.memberName) && (
              <div className="ArticleAction">
                <Link to="edit">수정</Link>
                <button onClick={deleteArticlePostHandler} type="button">
                  삭제
                </button>
              </div>
            )}
          </div>
          <div className="ArticleSubInfo">
            <p>{article?.creator?.nickname}</p>
          </div>
        </header>
        <main>
          <div dangerouslySetInnerHTML={{__html:article?.content}} />
        </main>
        <div className="Reply">
          <form onSubmit={handleSubmit(replyHandler)}>
            <TextField
              sx={{ width: "50ch", m: 1 }}
              label="댓글 입력"
              multiline
              rows={5}
              {...register("comment", { required: true })}
              className="ReplyInput"
            />
            <button>댓글 달기</button>
          </form>
        </div>
        <div className="CommentList">
          <h2>댓글</h2>
          {comments?.length === 0 && <p>댓글이 없습니다.</p>}
          {comments?.map((comment) => {
            return (
              <div className="Comment" key={comment?.id}>
                  <React.Fragment>
                    <div className="CommentHeader">
                      <div className="CommentTitle">
                        <Avatar
                          alt={comment?.creator?.nickname}
                          src={comment.creator?.profileImgUrl}
                        />
                        <span>{comment?.creator?.nickname}</span>
                      </div>
                      <div className="CommentAction" >
                        {(comment?.creator?.nickname === nickname && comment?.content !== null) && (
                          <React.Fragment>
                            <Button
                              variant="outlined"
                              onClick={() => {
                                setIsCommentUpdateForm((prev) => ({
                                  id: comment.id,
                                  updateFormVisible: !prev.updateFormVisible,
                                }));
                                updateSecondSetValue("commentUpdate", comment.content);
                              }}
                              style={{fontFamily: 'SEBANG_Gothic_Bold, sans-serif'}}
                            >
                              댓글 수정
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() =>
                                deleteCommentHandler(comment.id)
                              }
                              style={{fontFamily: 'SEBANG_Gothic_Bold, sans-serif'}}
                            >
                              댓글삭제
                            </Button>
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                    <div className="Comment-content">
                      {!isCommentUpdateForm.updateFormVisible ? <p>{comment.content === null ? <span style={{color:'red'}}>삭제된 댓글입니다!</span> : comment.content}</p> : 
                      <CommentUpdateForm onSubmit={updateSecondHandleSubmit(commentUpdateHandler)}>
                        <TextField
                          fullWidth
                          sx={{ m: 1 }}
                          label="댓글 수정"
                          multiline
                          rows={2}
                          {...updateSecondRegister('commentUpdate', { required: true })}
                          />
                          <div>
                            <Button type="button" color="error" onClick={()=>setIsCommentUpdateForm((prev) => ({
                                  ...prev,
                                  updateFormVisible: !prev.updateFormVisible,
                                }))}>취소</Button>
                            <Button color="primary" type="submit">확인</Button>
                          </div>
                        </CommentUpdateForm>}
                    </div>
                    <div className="Comment-reply">
                      <Accordion className="CommentReplyAccordion">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <p>{comment.children.length}개의 댓글 확인하기</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="CommentReplyContent">
                            <div>
                              {comment?.children?.map((child) => (
                                <CommentsReplyContentStyle
                                  key={child.id}
                                >
                                  <div className="CommentReplyContentWrapper">
                                    <div className="CommentReplyContentHeader">
                                      <Avatar
                                        alt={child?.creator?.nickname}
                                        src={child?.creator?.profileImgUrl}
                                      />
                                      <p>{child?.creator?.nickname}</p>
                                    </div>
                                    <div className="CommentReplyContentMain">
                                      <p>{child.content}</p>
                                    </div>
                                    <div className="CommentReplyContentAction">
                                      {child?.creator?.nickname ===
                                        nickname && (
                                        <React.Fragment>
                                          <button
                                            onClick={() =>
                                              deleteCommentHandler(
                                                child.id
                                              )
                                            }
                                          >
                                            댓글삭제
                                          </button>
                                          <button
                                            onClick={() => {
                                              setreplyComments((prev) => ({
                                                id: child.id,
                                                replyFormVisible:
                                                  !prev.replyFormVisible,
                                                variant: "update",
                                              }));
                                            }}
                                          >
                                            수정하기
                                          </button>
                                        </React.Fragment>
                                      )}
                                    </div>
                                  </div>
                                  {replyComments.id === child.id &&
                                    replyComments.replyFormVisible && (
                                      <CommentsReplyStyle
                                        onSubmit={updateHandleSubmit(
                                          commentReplyUpdateHandler
                                        )}
                                      >
                                        <TextField
                                          sx={{ width: "50ch", m: 1 }}
                                          label="댓글 수정"
                                          multiline
                                          className="CommentReplyInput"
                                          rows={5}
                                          {...updateRegister(
                                            "commentReplyUpdate",
                                            {
                                              required: true,
                                            }
                                          )}
                                        />
                                        <button type="submit">댓글 수정</button>
                                      </CommentsReplyStyle>
                                    )}
                                </CommentsReplyContentStyle>
                              ))}
                            </div>
                            <button
                              type="button"
                              className="CommentReplyFormButton"
                              onClick={() => {
                                replyComments.variant === "reply"
                                  ? setreplyComments((prev) => ({
                                      id: comment.id,
                                      replyFormVisible: !prev.replyFormVisible,
                                      variant: "reply",
                                    }))
                                  : setreplyComments((prev) => ({
                                      id: comment.id,
                                      replyFormVisible: prev.replyFormVisible,
                                      variant: "reply",
                                    }));
                              }}
                            >
                              {replyComments.replyFormVisible &&
                              replyComments.variant === "reply" ? (
                                <div className="FormClose">▲답글 취소</div>
                              ) : (
                                <div className="FormOpen">▼답글 열기</div>
                              )}
                            </button>
                            {replyComments.id === comment.id &&
                              replyComments.replyFormVisible && (
                                <CommentsReplyStyle
                                  onSubmit={secondHandleSubmit(
                                    commentReplyHandler
                                  )}
                                >
                                  <TextField
                                    sx={{ width: "50ch", m: 1 }}
                                    label={
                                      replyComments.variant === "reply"
                                        ? "답글 달기"
                                        : "댓글 수정"
                                    }
                                    multiline
                                    className="CommentReplyInput"
                                    rows={5}
                                    {...secondRegister("commentReply", {
                                      required: true,
                                    })}
                                  />
                                  <button type="submit">
                                    {replyComments.variant === "reply"
                                      ? "답글 달기"
                                      : "댓글 수정"}
                                  </button>
                                </CommentsReplyStyle>
                              )}
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </React.Fragment>
              </div>
            );
          })}
        </div>
      </div>
    </ArticleWrapper>
  );
}

export default BoardArticlesPost;
