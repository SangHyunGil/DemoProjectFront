import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router";
import {findBoard, updateBoard} from '../../Api/Api';
import { FormControl } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from "react-query";
import TextField from '@mui/material/TextField';
import FormHelperText from "@mui/material/FormHelperText";
import styled from "styled-components";
import { getCookie } from '../../utils/cookie';
import Button from '@mui/material/Button';

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

const study = [
    {id:0, val: "PREPARE", text: '스터디 준비 중'}, {id:1, val: "STUDYING", text: '스터디 진행 중'}, 
    {id:2, val: "FINISH", text: '스터디 종료'}
];

const recruit = [
    {id:0, val: "PROCEED", text: '모집 중'}, {id:1, val: "END", text: '모집 마감'}
];

function UpdateStudy() {
    const params = useParams();
    const [Tags, setTags] = useState([])
    const [recruitState, setRecruitState] = useState('PROCEED');
    const [thumbnail, setThumbnail] = useState(null);
    const [previewImg, setPreviewImg] = useState('');
    const navigate = useNavigate();
    const {data:BoardData} = useQuery(['findBoard', params.studyId], () => findBoard(params.studyId),{
        select: (data) => data.data.data,
        onSuccess: (x) => {
            console.log(x);
            setValue('title', x.title);
            setValue('content', x.content);
            setValue('headCount', x.headCount);
            setValue('schedule', x.schedule);
            x.tags.forEach((tag) => {
                setTags(prev=>[...prev,{id:Math.random(),val:tag}])
            })
        },
    });
    const { register, handleSubmit, formState: {errors}, setValue } = useForm();
    const UpdateBoard = useMutation(['updateBoard', params.studyId], (data) => updateBoard(data,params.studyId,getCookie('accessToken')),{
        onSuccess: () => {
            navigate('/study');
        },
        onError: (err) => {
            console.log(err);
        }
    });

    const UpdateSubmitHandler = (data) => {
        const formData = new FormData();
        formData.append('content', data.content);
        formData.append('headCount', data.headCount);
        if (thumbnail) {
            formData.append("profileImg", thumbnail);
        }
        formData.append('recruitState',data.recruitState);
        formData.append('schedule',data.schedule);
        formData.append('studyMethod',data.method);
        formData.append('tags',[Tags.map((tag)=>{return tag.val})]);
        formData.append('studyState',data.studyState);
        formData.append('title',data.title);
        UpdateBoard.mutate(formData);
    };

    const handleUpload = (e) => {
        const { files } = e.target;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImg(e.target.result);
            };
            reader.readAsDataURL(files[0]);
            setThumbnail(files[0]);
        }
    };

    const handleTags = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = e.target.value;
            setTags(prev=>[...prev,{id:Math.random(), val:value}]);
            e.target.value = '';
        }
    };

    const TagsClickHandler = (id) => {
        setTags(prev=>prev.filter(tag => tag.id !== id));
    };

    const CheckKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return (
        <>
            <h1>수정 페이지</h1>
            <form onSubmit={handleSubmit(UpdateSubmitHandler)}>
                <FormControl>
                    <InputLabel htmlFor="BoardTitle">제목</InputLabel>
                    <OutlinedInput
                        id="BoardTitle"
                        label="제목"
                        onKeyDown={(e)=>{CheckKeyDown(e)}}
                        {...register('title', {value:' '})}
                    />
                </FormControl>
                <FormControl sx={{ width: "50ch", m: 1 }}>
                    <InputLabel htmlFor="outlined-study-tags">스터디 주제</InputLabel>
                    <OutlinedInput 
                        id="outlined-study-tags"
                        label="스터디 주제"
                        onKeyDown={(e)=>handleTags(e)}
                        {...register('tags')}
                    />
                    <FormHelperText sx={{color:'blue'}}>{Tags?.map(tag=><TagsStyle onClick={()=>TagsClickHandler(tag.id)} key={tag.id}>{tag.val}</TagsStyle>)}</FormHelperText>
                </FormControl>
                <FormControl>
                    <TextField 
                        id="BoardContent"
                        label="내용"
                        multiline
                        fullWidth
                        rows={5}
                        onKeyDown={(e)=>{
                            if(e.key === 'Enter'){
                                if (!e.shiftKey){
                                    e.preventDefault();
                                }
                            }
                        }}
                        {...register('content',{required:'스터디 내용을 입력해 주세요'})}
                    />
                </FormControl>
                <FormControl sx={{ width: "50ch", m: 1 }}>
                    <InputLabel htmlFor="outlined-study-headCount">스터디 인원</InputLabel>
                    <OutlinedInput 
                        id="outlined-study-headCount"
                        label="스터디 인원"
                        type="number"
                        onKeyDown={(e)=>{CheckKeyDown(e)}}
                        {...register('headCount',{value: ' ',required:'스터디 인원을 입력해 주세요',pattern:{value:/^\d*[1-9]\d*$/, message:'0이상의 숫자만 입력해 주세요'}})}
                    />
                    <FormHelperText sx={{color:'red'}}>{errors?.headCount?.message}</FormHelperText>
                </FormControl>
                <FormControl sx={{ width: "50ch", m: 1 }} >
                    <InputLabel htmlFor="outlined-study-schedule">스터디 일정</InputLabel>
                    <OutlinedInput 
                        id="outlined-study-schedule"
                        label="스터디 일정"
                        onKeyDown={(e)=>{CheckKeyDown(e)}}
                        {...register('schedule',{value: ' ',required:'스터디 일정을 입력해 주세요'})}
                    />
                    <FormHelperText sx={{color:'red'}}>{errors?.schedule?.message}</FormHelperText>
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
                <button type="submit">수정</button>
            </form>
        </>
    )
}

export default UpdateStudy;
