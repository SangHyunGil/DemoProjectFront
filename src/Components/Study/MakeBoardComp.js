import React, { useState } from "react";
import { createBoard } from "../../Api/Api";
import useInput from "../../hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { updateStudyIds } from '../../reducers/users';
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useMutation } from "react-query";

import { useForm } from "react-hook-form";
import styled from "styled-components";
import { getCookie } from "../../utils/cookie";

const MakeBoardHeader = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MakeBoardContainer = styled.section`
    margin: 0 auto;
`;

const MakeBoardForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`;

const TagsStyle = styled.span`
    margin-left: 10px;
    &:first-child {
        margin-left: 0;
    }
    &:hover {
        cursor: pointer;
        background-color: skyblue;
        padding: 5px 10px;
    }
`;

const MakeRoomComp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [recruitState, setRecruitState] = useState('PROCEED');
    const [Tags, setTags] = useState([])
    const [previewImg, setPreviewImg] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const { id, accessToken } = useSelector((state) => state.users);
    const { register, handleSubmit, formState:{errors} } = useForm();

    const createBoardMutation = useMutation(['createBoard',id],
    (data)=>createBoard(data,getCookie('accessToken')),{
        onSuccess: () => {
            navigate('/study');
        }
    });

    const study = [
        {id:0, val: "PREPARE", text: '스터디 준비 중'}, {id:1, val: "STUDYING", text: '스터디 진행 중'}, 
        {id:2, val: "FINISH", text: '스터디 종료'}
    ];

    const recruit = [
        {id:0, val: "PROCEED", text: '모집 중'}, {id:1, val: "END", text: '모집 마감'}
    ];

    const onCreateBoard = (data) => {
        const formData = new FormData();
        formData.append('content', data.content);
        formData.append('headCount', data.headCount);
        formData.append('memberId',id);
        formData.append("profileImg", thumbnail);
        formData.append('recruitState',data.recruitState);
        formData.append('schedule',data.schedule);
        formData.append('studyMethod',data.method);
        formData.append('tags',[Tags.map((tag)=>{return tag.val})]);
        formData.append('studyState',data.studyState);
        formData.append('title',data.title);

        createBoardMutation.mutate(formData);
        /*
        createBoard(content, title, topic, headCount, studyState, recruitState, id, accessToken)
            .then(response => {
                const {data: {studyId}} = response.data;
                console.log(studyId);
                dispatch(updateStudyIds(studyId));
                navigate('/study');
            })
            .catch(error => console.log(error));*/
    };

    const handleTags = (e) => {
        if (e.key === 'Enter') {
            const value = e.target.value;
            setTags(prev=>[...prev,{id:prev.length, val:value}]);
            e.target.value = '';
        }
    };
    
    const CheckKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const handleUpload = (e) => {
        const { files } = e.target;
        const reader = new FileReader();
        setThumbnail(files[0]);
        reader.onload = () => {
          setPreviewImg(reader.result);
        }
        reader.readAsDataURL(files[0]);
    };

    const TagsClickHandler = (id) => {
        setTags(prev=>prev.filter(tag => tag.id !== id));
    };

    return (
        <MakeBoardContainer>
            <MakeBoardHeader>
                <h1>스터디 만들기</h1>
                <p>스터디를 만들어 볼까요?</p>
            </MakeBoardHeader>
            <MakeBoardForm onSubmit={handleSubmit(onCreateBoard)} onKeyDown={(e)=>{CheckKeyDown(e)}}>
                <FormControl sx={{ width: "50ch", m: 1 }}>
                    <InputLabel htmlFor="outlined-study-name">스터디 이름</InputLabel>
                    <OutlinedInput 
                        id="outlined-study-name"
                        label="스터디 이름"
                        {...register('title',{required:'스터디 이름을 입력해 주세요'})}
                    />
                    <FormHelperText sx={{color:'red'}}>{errors?.title?.message}</FormHelperText>
                </FormControl>
                <FormControl sx={{ width: "50ch", m: 1 }}>
                    <InputLabel htmlFor="outlined-study-topic">스터디 주제</InputLabel>
                    <OutlinedInput
                        id="outlined-study-topic"
                        label="스터디 주제"
                        {...register('topic',{required:'스터디 주제를 입력해 주세요'})}
                    />
                    <FormHelperText sx={{color:'red'}}>{errors?.topic?.message}</FormHelperText>
                </FormControl>
                <FormControl sx={{ width: "50ch", m: 1 }}>
                    <InputLabel htmlFor="outlined-study-headCount">스터디 인원</InputLabel>
                    <OutlinedInput 
                        id="outlined-study-headCount"
                        label="스터디 인원"
                        type="number"
                        {...register('headCount',{required:'스터디 인원을 입력해 주세요',pattern:{value:/^\d*[1-9]\d*$/, message:'0이상의 숫자만 입력해 주세요'}})}
                    />
                    <FormHelperText sx={{color:'red'}}>{errors?.headCount?.message}</FormHelperText>
                </FormControl>
                <FormControl sx={{ width: "50ch", m: 1 }}> 
                    <TextField 
                        id="outlined-study-content"
                        label="스터디 내용"
                        multiline
                        fullWidth
                        rows={5}
                        {...register('content',{required:'스터디 내용을 입력해 주세요'})}
                    />
                    <FormHelperText sx={{color:'red'}}>{errors?.content?.message}</FormHelperText>
                </FormControl>
                <FormControl sx={{ width: "50ch", m: 1 }} >
                    <InputLabel htmlFor="outlined-study-schedule">스터디 일정</InputLabel>
                    <OutlinedInput 
                        id="outlined-study-schedule"
                        label="스터디 일정"
                        {...register('schedule',{required:'스터디 일정을 입력해 주세요'})}
                    />
                    <FormHelperText sx={{color:'red'}}>{errors?.schedule?.message}</FormHelperText>
                    
                </FormControl>
                <FormControl sx={{ width: "50ch", m: 1 }}>
                    <InputLabel htmlFor="outlined-study-tags">스터디 태그</InputLabel>
                    <OutlinedInput 
                        id="outlined-study-tags"
                        label="스터디 태그"
                        onKeyDown={(e)=>handleTags(e)}
                        {...register('tags')}
                    />
                    <FormHelperText sx={{color:'blue'}}>{Tags?.map(tag=><TagsStyle onClick={()=>TagsClickHandler(tag.id)} key={tag.id}>#{tag.val}</TagsStyle>)}</FormHelperText>
                </FormControl>
                <FormControl sx={{ width: "50ch", m: 1 }}>
                    <select {...register('method')}>
                        <option value="FACE">대면</option>
                        <option value="NONFACE">비대면</option>
                        <option value="UNDEFINED">미정</option>
                    </select>
                </FormControl>
                {previewImg === '' ? null : <img src={previewImg} alt="preview" style={{width:'10ch'}}/>}
                <label htmlFor="contained-button-file">
                    <input style={{display:'none'}} accept="image/*" id="contained-button-file" name="thumbNailImg" type="file" onChange={handleUpload}/>
                    <Button variant="contained" component="span" sx={{m:2}}>
                        썸네일 이미지 선택
                    </Button>
                </label>
                <label htmlFor="studyState">스터디 상태</label>
                <select {...register('studyState')}>
                    {study.map((x) => (
                        <option key={x.id} value={x.val}>{x.val}</option>
                    ))}
                </select>
                <label htmlFor="recruitState">모집 상태</label>
                <div>
                    {recruit.map((x) =>
                    <React.Fragment key={x.id}>
                        <input
                        id = {x.val}
                        name={x.val}
                        type="radio" 
                        value={x.val} 
                        {...register('recruitState',{required: '모집 상태를 선택해 주세요!'})}
                        checked={recruitState===x.val}
                        onChange={()=>{setRecruitState(x.val)}} />
                        <label htmlFor={x.val}>{x.text}</label>
                    </React.Fragment>)}
                </div> <b />
                <button type="submit">개설</button>
            </MakeBoardForm>
        </MakeBoardContainer>
    )
}

export default MakeRoomComp;