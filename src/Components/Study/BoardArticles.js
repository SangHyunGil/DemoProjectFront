import React,{useEffect,useState} from 'react';
import {useParams,Link, useNavigate} from 'react-router-dom';
import {findAllBoardArticles,createBoardArticle} from '../../Api/Api';
import useInput from '../../hooks/useInput';
import Card from '../Card/Card';
import Modal from '../Modal/Modal';
import { useSelector} from "react-redux";

function BoardArticles() {
    const {studyId,boardId} = useParams();
    const navigate = useNavigate();
    const [boardArticles,setBoardArticles] = useState([]);
    const [IsModalUp, setIsModalUp] = useState(false);
    const {id,accessToken} = useSelector(state => state.users);
    const [articleTitle, setArticleTitle] = useInput('');
    const [articleContent, setArticleContent] = useInput('');
    const [HasArticle, setHasArticle] = useState(false);

    useEffect(() => {
        const BoardfindArticles = async () => {
            await findAllBoardArticles(studyId,boardId).then(res=>{
                const {data:{data}} = res;
                setBoardArticles(()=>[...data]);
            }).catch(err=>{
                console.log(err);
            });
        }
        BoardfindArticles();
    },[studyId,boardId]);

    useEffect(() => {
        if (boardArticles.length === 0) {
            setHasArticle(false);
        } else {
            setHasArticle(true);
        }
    },[boardArticles,HasArticle]);

    const createArticleModalHandler = () => {
        setIsModalUp(true);
    };

    const createArticleHandler = async (e) => {
        e.preventDefault();
        await createBoardArticle(studyId,boardId,{title:articleTitle,content:articleContent,memberId:id},accessToken);
        await findAllBoardArticles(studyId,boardId).then(res=> {
            const {data:{data}} = res;
            setBoardArticles([...data]);
        }).catch(
            err=>console.log(err)
        );
        navigate(`/study/${studyId}/board/${boardId}/articles`);
        setIsModalUp(false);
    }

    return (
        <div>
            {HasArticle ? boardArticles.map(article => (
                <Link to={`/study/${studyId}/board/${boardId}/article/${article.articleId}`} key={article.articleId}>
                    <Card>
                        <h3>{article.title}</h3>
                        <p>{article.content}</p>
                        <p>{article.memberName}</p>
                    </Card>
                </Link>
            )): <div>데이터가 없습니다.</div>}
            {IsModalUp && <Modal title="게시글 생성" ModalHandler={()=>{setIsModalUp(false)}}>
                    <form onSubmit={createArticleHandler}>
                        <input type="text" placeholder="제목" onChange={setArticleTitle} value={articleTitle} />
                        <textarea placeholder="내용" onChange={setArticleContent} value={articleContent} />
                        <button type="submit">만들기</button>
                    </form>
            </Modal>}
            <button type="button" onClick={createArticleModalHandler}>게시글 추가</button>
        </div>
    )
}

export default BoardArticles;
