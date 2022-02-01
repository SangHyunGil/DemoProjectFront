import React from 'react';
import {useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import {updateArticlePost} from '../Api/Api';
import {getCookie} from '../utils/cookie';
import {useParams, useNavigate} from 'react-router-dom';

function BoardArticlePostEdit() {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const {studyId,boardId,articleId} = useParams();
    const UpdateBoardMutation = useMutation((data)=>updateArticlePost(studyId,boardId,articleId,data,getCookie('accessToken')),{
        onSuccess: ()=>{
            navigate(`/study/${studyId}/board/${boardId}/article/${articleId}`);
        }
    });
    const navigate = useNavigate();
    const onSubmit = data => {
        UpdateBoardMutation.mutate(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
           <input {...register("name", {required:'제목을 입력해 주세요',minLength: {value:2, message:'2자리 이상 입력해 주세요'}})} placeholder='제목' />
           {<span>{errors?.name?.message}</span>}
           <input {...register("content",{required:'내용을 입력해 주세요'})} placeholder='내용' />
           {<span>{errors?.content?.message}</span>}
           <button type="submit">등록</button> 
        </form>
    )
}

export default BoardArticlePostEdit;
