import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { findAllBoardArticles, createBoardArticle } from "../../Api/Api";
import useInput from "../../hooks/useInput";
//import Card from "../Card/Card";
import MuiDialog from "../Modal/MuiDialog";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getCookie } from "../../utils/cookie";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import { FormControl } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Avatar from "@mui/material/Avatar";
import "react-quill/dist/quill.snow.css";
import Editor from "../Editor/Editor";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: 900px) {
    bottom: 1%;
  }
  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
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

const ArticleLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  color: black;
  .nameWrapper {
    display: flex;
    align-items: center;
  }
`;

const AddArticleButton = styled(AddCircleIcon)`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  cursor: pointer;
  &:hover {
    transition: all 0.3s linear;
    color: #2ecc71;
  }
  z-index: 100;
`;

const CreateArticleForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;
  .ql-editor{
    min-height: 300px !important;
    max-height: 800px;
    overflow: hidden;
    overflow-y: scroll;
    overflow-x: scroll;
  }
  button {
    background-color: #0049af;
    transition: all 0.3s linear;
    border: 0;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    color: white;
    &:hover {
      background-color: #ffc107;
      transition: all 0.3s linear;
      cursor: pointer;
    }
  }
`;

const ArticleList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  li {
    width: 60vw;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    margin: 1rem 0;
    padding: 1rem 2rem;
    &:hover {
      background-color: #c7ecee;
    }
    a {
      display: flex;
      flex-direction: column;
      gap: 10px;
      position: relative;
      .ArticleWrapper {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
    }
  }
  @media (max-width: 640px) {
    li {
      width: 80vw;
      padding: 1rem 0.5rem;
    }
  }
`;

const ArticleCard = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 1rem;
  flex: 1;
  align-self: center;
`;

const ViewBoxBlock = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  .viewBox {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      text-align: center;
    }
  }
  justify-self: flex-end;
`;

const AritcleEmptyBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    margin: 6rem 0;
    text-align: center;
    font-family: "OTWelcomeBA", sans-serif;
    font-size: 2.8rem;
  }
`;

const ArticleEmpty = () => {
  return (
    <AritcleEmptyBlock>
      <img src="/StudyImg/ArticleNotFound.png" alt="studyImgNotFound" />
      <h2>아직 게시글이 없습니다! 게시글을 작성해 보세요!</h2>
    </AritcleEmptyBlock>
  );
};

function BoardArticles() {
  const { studyId, boardId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //const [boardArticles,setBoardArticles] = useState([]);
  const [IsModalUp, setIsModalUp] = useState(false);
  const { id, accessToken, nickname } = useSelector((state) => state.users);
  const [articleTitle, onChangeArticleTitle, setArticleTitle] = useInput("");
  const [articleContent, setArticleContent] = useState("");
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
      findAllBoardArticles(studyId, boardId, page, 4, getCookie("accessToken")),
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
          4,
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
          <ArticleList>
            {BoardArticle?.data?.map((article) => (
              <li key={article.id}>
                <ArticleLink
                  to={`/study/${studyId}/board/${boardId}/article/${article?.id}`}
                >
                  <div className="ArticleWrapper">
                    <ArticleCard>
                      <div className="mainContent">
                        <header>
                          <h3>{article.title}</h3>
                        </header>
                        <footer>
                          <p>{article.memberName}</p>
                        </footer>
                      </div>
                    </ArticleCard>
                  </div>
                  <div className="nameWrapper">
                    <Avatar
                      alt={article?.creator?.nickname}
                      src={article?.creator?.profileImgUrl}
                    />
                    <p>{article?.creator?.nickname}</p>
                  </div>
                  <ViewBoxBlock>
                    <div className="viewBox">
                      <p>
                        {article.views}
                        <br />
                        조회
                      </p>
                    </div>
                  </ViewBoxBlock>
                </ArticleLink>
              </li>
            ))}
          </ArticleList>
        )
      ) : (
        <ArticleEmpty />
      )}
      <PaginationWrapper>
        <Pagination
          activePage={page + 1}
          itemsCountPerPage={4}
          totalItemsCount={BoardArticle?.totalPages * 4}
          pageRangeDisplayed={BoardArticle?.totalPages}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={(page) => setPage(page - 1)}
        />
      </PaginationWrapper>
      {IsModalUp && (
        <MuiDialog
          open={IsModalUp}
          onClose={() => setIsModalUp(false)}
          fullWidth
          maxWidth="lg"
        >
          <h2 style={{ textAlign: "center" }}>게시글 작성</h2>
          <CreateArticleForm onSubmit={createArticleHandler}>
            <FormControl sx={{ m: 1, width: "60%" }}>
              <InputLabel htmlFor="article-title">제목</InputLabel>
              <OutlinedInput
                id="article-title"
                value={articleTitle}
                onChange={onChangeArticleTitle}
                label="제목"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "60%" }}>
              <Editor
                value={articleContent}
                onChange={setArticleContent}
                studyId={studyId}
                boardId={boardId}
              />
            </FormControl>
            <button type="submit">만들기</button>
          </CreateArticleForm>
        </MuiDialog>
      )}
      <AddArticleButton
        color="primary"
        sx={{ fontSize: 60 }}
        onClick={createArticleModalHandler}
      >
        게시글 추가
      </AddArticleButton>
    </div>
  );
}

export default BoardArticles;
