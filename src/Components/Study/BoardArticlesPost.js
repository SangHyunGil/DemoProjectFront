import React from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {useQuery, useMutation} from 'react-query';
import {getArticlePost, findUserBoard,deleteBoardArticle} from '../../Api/Api';
import {getCookie} from '../../utils/cookie';

function BoardArticlesPost() {
    const {studyId,boardId,articleId} = useParams();
    const navigate = useNavigate();
    const {data:article} = useQuery(['Post', studyId, boardId, articleId], ()=>getArticlePost(studyId,boardId,articleId,getCookie('accessToken')), {
        select: (x) => x.data.data,
    });
    const {data:userInfo} = useQuery(['User', studyId, boardId, articleId], ()=>findUserBoard(getCookie('accessToken')), {
        select: (x) => x.data.data,
        onSuccess: () => {
            console.log(userInfo);
        }
    });
    const deleteArticlePostMutation = useMutation(()=>deleteBoardArticle(studyId,boardId,articleId,getCookie('accessToken')),{
        onSuccess: ()=>{
            navigate(`/study/${studyId}/board/${boardId}/articles`);
        }
    });

    const deleteArticlePostHandler = () => {
        deleteArticlePostMutation.mutate();
    };

    console.log(["ADMIN", "CREATOR"].includes(userInfo?.studyInfos[studyId-1]?.studyRole));
    return (
        <div>
            <h1>{article?.title}</h1>
            <h3>{`#${userInfo?.department}`}</h3>
            <p>{article?.memberName}</p>
            <p>{article?.content}</p>
            {(["ADMIN, CREATOR"].includes(userInfo?.studyInfos[studyId-1]?.studyRole) || userInfo?.nickname === article?.memberName) && (
            <React.Fragment>
                <Link to="edit">수정</Link>
                <button onClick={deleteArticlePostHandler} type="button">삭제</button>
            </React.Fragment>)}
        </div>
    )
}

export default BoardArticlesPost;
