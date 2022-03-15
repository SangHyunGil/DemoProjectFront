import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import { updateArticlePost, getArticlePost } from "../Api/Api";
import { getCookie } from "../utils/cookie";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "../Components/Editor/Editor";
import styled from "styled-components";

const EditFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80vw;
  max-width: 1400px;
  margin: 2rem auto;
  div {
      p {
          font-size: 1.2rem;
          font-weight: bolder;
      }
      input {
          box-sizing: border-box;
          width: 100%;
          border-radius: 5px;
      }
  }
  button {
    background-color: #0049af ;
    border: 0;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    color: white;
    &:hover {
        cursor: pointer;
        background-color: #ffc107;
    }
  }
`;

function BoardArticlePostEdit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: setNameValue,
  } = useForm();
  const { studyId, boardId, articleId } = useParams();
  const [value, setValue] = useState("");
  const UpdateBoardMutation = useMutation(
    (data) =>
      updateArticlePost(
        studyId,
        boardId,
        articleId,
        data,
        getCookie("accessToken")
      ),
    {
      onSuccess: () => {
        navigate(`/study/${studyId}/board/${boardId}/article/${articleId}`);
      },
    }
  );
  const _ = useQuery(
    ["Post", studyId, boardId, articleId],
    () => getArticlePost(studyId, boardId, articleId, getCookie("accessToken")),
    {
      select: (x) => x.data.data,
      onSuccess: (x) => {
        setValue(x.content);
        setNameValue("name", x.title);
      },
    }
  );
  const navigate = useNavigate();
  const onSubmit = (data) => {
    if (window.confirm("수정하시겠습니까?")) {
      UpdateBoardMutation.mutate({ name: data.name, content: value });
    }
  };
  return (
    <EditFormStyle onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>제목</p>
        <input
          {...register("name", {
            required: "제목을 입력해 주세요",
            minLength: { value: 2, message: "2자리 이상 입력해 주세요" },
          })}
          placeholder="제목"
        />
        {<span>{errors?.name?.message}</span>}
      </div>
      <div>
        <p>내용</p>
        <Editor
          value={value}
          onChange={setValue}
          studyId={studyId}
          boardId={boardId}
        />
      </div>
      <button type="submit">등록</button>
    </EditFormStyle>
  );
}

export default BoardArticlePostEdit;
