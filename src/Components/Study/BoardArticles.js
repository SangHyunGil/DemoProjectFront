import React,{useEffect,useState} from 'react';
import {useParams,Link, useNavigate} from 'react-router-dom';
import {findAllBoardArticles,createBoardArticle,deleteBoardArticle,updateBoardArticle} from '../../Api/Api';
import useInput from '../../hooks/useInput';
import Card from '../Card/Card';
import Modal from '../Modal/Modal';
import { useSelector} from "react-redux";
import {useQuery,useMutation,useQueryClient} from 'react-query';
import {getCookie} from '../../utils/cookie';

function BoardArticles() {
    const {studyId,boardId} = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    //const [boardArticles,setBoardArticles] = useState([]);
    const [IsModalUp, setIsModalUp] = useState(false);
    const {id,accessToken,nickname} = useSelector(state => state.users);
    const [articleTitle,onChangeArticleTitle ,setArticleTitle] = useInput('');
    const [articleContent,onChangeArticleContent ,setArticleContent] = useInput('');
    const [HasArticle, setHasArticle] = useState(false);
    const {isLoading,error,data:BoardArticle} = useQuery(['boardArticles',boardId],()=>findAllBoardArticles(studyId,boardId,getCookie('accessToken')),{
        select: article => article.data.data,
    });
    const mutation = useMutation((ContentObj)=>createBoardArticle(studyId,boardId,ContentObj,accessToken),{
        onSuccess: ()=>{
            queryClient.invalidateQueries('boardArticles');
            //setBoardArticles(BoardArticle);
        },
    });
    /* 
    const deleteMutation = useMutation((articleId)=>deleteBoardArticle(studyId,boardId,articleId,accessToken),{
        onSuccess: ()=>{
            queryClient.invalidateQueries(['boardArticles',boardId]);
            //setBoardArticles(BoardArticle);
        },
    });
   
    const updateMutation = useMutation((articleId,content,title)=>updateBoardArticle(studyId, boardId, articleId,content,title, accessToken),{
        onSuccess: ()=>{
            queryClient.invalidateQueries(['boardArticles',boardId]);
        }
    });*/
    

    /*
    useEffect(() => {
        const BoardfindArticles = async () => {
            await findAllBoardArticles(studyId,boardId,accessToken).then(res=>{
                const {data:{data}} = res;
                setBoardArticles(()=>[...data]);
            }).catch(err=>{
                console.log(err);
            });
        }
        BoardfindArticles();
    },[studyId,boardId]);*/

    useEffect(() => {
        if (BoardArticle?.length === 0) {
            setHasArticle(false);
        } else {
            setHasArticle(true);
        }
    },[BoardArticle,HasArticle]);

    const createArticleModalHandler = () => {
        setIsModalUp(true);
    };

    const createArticleHandler = (e) => {
        e.preventDefault();
        //await createBoardArticle(studyId,boardId,{title:articleTitle,content:articleContent,memberId:id},accessToken);
        mutation.mutate({title:articleTitle,content:articleContent,memberId:id});
        navigate(`/study/${studyId}/board/${boardId}/articles`);
        setArticleTitle('');
        setArticleContent('');
        setIsModalUp(false);
    }
    /*
    const deleteArticleHandler = (e) => {
        e.preventDefault();
        //console.log(e.target.name);
        deleteMutation.mutate(e.target.name);
        navigate(`/study/${studyId}/board/${boardId}/articles`);
    };*/
    /*
    const updateArticleHandler = (e) => {
        e.preventDefault();
        updateMutation.mutate(e.target.name,articleContent,articleTitle);
    }
    {nickname === article.memberName && <button type="button" name={article.articleId} onClick={updateArticleHandler}>게시글 수정</button>}
    */

    return (
        <div>
            {error && <div>에러가 발생했습니다.{error.message}</div>}
            {HasArticle ?  (isLoading ? "LOADING": (BoardArticle?.map(article => (
                <React.Fragment key={article.articleId}>
                    <Link to={`/study/${studyId}/board/${boardId}/article/${article.articleId}`}>
                        <Card>
                            <h3>{article.title}</h3>
                            <p>{article.content}</p>
                            <p>{article.memberName}</p>
                        </Card>
                    </Link>               
                </React.Fragment>
            )))) : <div>데이터가 없습니다.</div>}
            {IsModalUp && <Modal title="게시글 생성" ModalHandler={()=>{setIsModalUp(false)}}>
                    <form onSubmit={createArticleHandler}>
                        <input type="text" placeholder="제목" onChange={onChangeArticleTitle} value={articleTitle} />
                        <textarea placeholder="내용" onChange={onChangeArticleContent} value={articleContent} />
                        <button type="submit">만들기</button>
                    </form>
            </Modal>}
            <button type="button" onClick={createArticleModalHandler}>게시글 추가</button>
        </div>
    )
}

export default BoardArticles;
