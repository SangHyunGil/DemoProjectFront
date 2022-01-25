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
  findBoard
} from "../../Api/Api";
import { getCookie } from "../../utils/cookie";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useSelector } from "react-redux";

const CommentsReplyStyle = styled.form``;

const CommentsReplyContentStyle = styled.div`
  margin-left: 1rem;
`;

function BoardArticlesPost() {
  const [replyComments, setreplyComments] = useState({
    id: "",
    replyFormVisible: false,
    variant: "reply",
  });
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
  const queryClient = useQueryClient();
  const { id, nickname } = useSelector((state) => state.users);
  const {data:{data:{studyMembers}}} = queryClient.getQueryData(['MembersOfStudy',studyId]);
  const myInfo = studyMembers.find(member => member.nickname === nickname);
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

  return (
    <>
      <h1>{article?.title}</h1>
      <h3>{`#${userInfo?.department}`}</h3>
      <p>{article?.memberName}</p>
      <p>{article?.content}</p>
      { (( myInfo.studyRole === 'ADMIN' || myInfo.studyRole === 'CREATOR') ||
        (userInfo?.nickname === article?.memberName)) && (
        <React.Fragment>
          <Link to="edit">수정</Link>
          <button onClick={deleteArticlePostHandler} type="button">
            삭제
          </button>
        </React.Fragment>
      )}
      <form onSubmit={handleSubmit(replyHandler)}>
        <TextField
          sx={{ width: "50ch", m: 1 }}
          label="댓글 입력"
          multiline
          rows={5}
          {...register("comment", { required: true })}
        />
        <button>댓글 달기</button>
      </form>
      <h2>댓글</h2>
      {comments?.length === 0 && <p>댓글이 없습니다.</p>}
      {comments?.map((comment) => {
        return (
          <div key={comment.commentId}>
            {
              comment.content ? (
                <React.Fragment>
                  <span>{comment.memberName}</span>
            <span>{comment.content}</span>
            <button
              type="button"
              onClick={() => {
                setreplyComments((prev) => ({
                  id: comment.commentId,
                  replyFormVisible: !prev.replyFormVisible,
                  variant: "reply",
                }));
              }}
            >
              답글 달기
            </button>
            {replyComments.id === comment.commentId &&
              replyComments.replyFormVisible && (
                <CommentsReplyStyle
                  onSubmit={secondHandleSubmit(commentReplyHandler)}
                >
                  <TextField
                    sx={{ width: "50ch", m: 1 }}
                    label={
                      replyComments.variant === "reply"
                        ? "답글 달기"
                        : "댓글 수정"
                    }
                    multiline
                    rows={5}
                    {...secondRegister("commentReply", { required: true })}
                  />
                  <button type="submit">
                    {replyComments.variant === "reply"
                      ? "답글 달기"
                      : "댓글 수정"}
                  </button>
                </CommentsReplyStyle>
              )}

            {comment?.memberProfile?.nickname === nickname && (
              <React.Fragment>
                <button onClick={() => deleteCommentHandler(comment.commentId)}>
                  댓글삭제
                </button>
                <button
                  onClick={() => {
                    setreplyComments((prev) => ({
                      id: comment.commentId,
                      replyFormVisible: !prev.replyFormVisible,
                      variant: "update",
                    }));
                  }}
                >
                  수정하기
                </button>
              </React.Fragment>
            )}
                </React.Fragment>
              ) : (<span style={{color:"red"}}>삭제된 댓글입니다!</span>)
            }
            <div>
              {comment?.children?.map((child) => (
                <CommentsReplyContentStyle key={child.commentId}>
                  <p>{child.memberName}</p>
                  <p>{child.content}</p>
                  {child?.memberProfile?.nickname === nickname && (
                    <React.Fragment>
                      <button
                        onClick={() => deleteCommentHandler(child.commentId)}
                      >
                        댓글삭제
                      </button>
                      <button
                        onClick={() => {
                          setreplyComments((prev) => ({
                            id: child.commentId,
                            replyFormVisible: !prev.replyFormVisible,
                            variant: "update",
                          }));
                        }}
                      >
                        수정하기
                      </button>
                    </React.Fragment>
                  )}
                  {replyComments.id === child.commentId &&
                    replyComments.replyFormVisible && (
                      <CommentsReplyStyle
                        onSubmit={updateHandleSubmit(commentReplyUpdateHandler)}
                      >
                        <TextField
                          sx={{ width: "50ch", m: 1 }}
                          label="댓글 수정"
                          multiline
                          rows={5}
                          {...updateRegister("commentReplyUpdate", {
                            required: true,
                          })}
                        />
                        <button type="submit">"댓글 수정"</button>
                      </CommentsReplyStyle>
                    )}
                </CommentsReplyContentStyle>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default BoardArticlesPost;
