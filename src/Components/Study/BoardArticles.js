import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { findAllBoardArticles, createBoardArticle } from "../../Api/Api";
import useInput from "../../hooks/useInput";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getCookie } from "../../utils/cookie";
import Pagination from "react-js-pagination";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  .pagination {
    display: flex;
    list-style: none;
    li {
      &:first-child {
        margin-left: 0;
      }
      margin-left: 0.5rem;
      background: #bdc3c7;
      border-radius: 0.25rem;
      padding: 0.5rem;
      a {
          text-decoration: none;
          color: #fff;
      }
    }
  }
`;

function BoardArticles() {
  const { studyId, boardId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //const [boardArticles,setBoardArticles] = useState([]);
  const [IsModalUp, setIsModalUp] = useState(false);
  const { id, accessToken, nickname } = useSelector((state) => state.users);
  const [articleTitle, onChangeArticleTitle, setArticleTitle] = useInput("");
  const [articleContent, onChangeArticleContent, setArticleContent] =
    useInput("");
  const [HasArticle, setHasArticle] = useState(false);

  const [page, setPage] = useState(0);

  const {
    isLoading,
    error,
    data: BoardArticle,
    isPreviousData,
  } = useQuery(
    ["boardArticles", boardId, page],
    () =>
      findAllBoardArticles(studyId, boardId, page, 2, getCookie("accessToken")),
    {
      select: (article) => article.data.data,
      onSuccess: (x) => {
        console.log(x);
      },
      keepPreviousData: true,
    }
  );
  const mutation = useMutation(
    (ContentObj) =>
      createBoardArticle(studyId, boardId, ContentObj, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("boardArticles");
        //setBoardArticles(BoardArticle);
      },
    }
  );

  useEffect(() => {
    if (BoardArticle?.hasNext) {
      queryClient.prefetchQuery(["boardArticles", boardId, page + 1], () =>
        findAllBoardArticles(
          studyId,
          boardId,
          page + 1,
          2,
          getCookie("accessToken")
        )
      );
    }
  }, [BoardArticle, queryClient, boardId, studyId, page]);

  useEffect(() => {
    if (BoardArticle?.data.length === 0) {
      setHasArticle(false);
    } else {
      setHasArticle(true);
    }
  }, [BoardArticle, HasArticle]);

  const createArticleModalHandler = () => {
    setIsModalUp(true);
  };

  const createArticleHandler = (e) => {
    e.preventDefault();
    //await createBoardArticle(studyId,boardId,{title:articleTitle,content:articleContent,memberId:id},accessToken);
    mutation.mutate({
      title: articleTitle,
      content: articleContent,
      memberId: id,
    });
    navigate(`/study/${studyId}/board/${boardId}/articles`);
    setArticleTitle("");
    setArticleContent("");
    setIsModalUp(false);
  };

  return (
    <div>
      {error && <div>에러가 발생했습니다.{error.message}</div>}
      {HasArticle ? (
        isLoading ? (
          "LOADING"
        ) : (
          BoardArticle?.data.map((article) => (
            <React.Fragment key={article.articleId}>
              <Link
                to={`/study/${studyId}/board/${boardId}/article/${article.articleId}`}
              >
                <Card>
                  <h3>{article.title}</h3>
                  <p>{article.content}</p>
                  <p>{article.memberName}</p>
                </Card>
              </Link>
            </React.Fragment>
          ))
        )
      ) : (
        <div>데이터가 없습니다.</div>
      )}
      <PaginationWrapper>
        <Pagination
          activePage={page + 1}
          itemsCountPerPage={2}
          totalItemsCount={BoardArticle?.totalPages * 2}
          pageRangeDisplayed={BoardArticle?.totalPages}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={(page) => setPage(page - 1)}
        />
      </PaginationWrapper>
      {IsModalUp && (
        <Modal
          title="게시글 생성"
          ModalHandler={() => {
            setIsModalUp(false);
          }}
        >
          <form onSubmit={createArticleHandler}>
            <input
              type="text"
              placeholder="제목"
              onChange={onChangeArticleTitle}
              value={articleTitle}
            />
            <textarea
              placeholder="내용"
              onChange={onChangeArticleContent}
              value={articleContent}
            />
            <button type="submit">만들기</button>
          </form>
        </Modal>
      )}
      <button type="button" onClick={createArticleModalHandler}>
        게시글 추가
      </button>
    </div>
  );
}

export default BoardArticles;
