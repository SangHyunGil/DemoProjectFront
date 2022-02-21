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
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Chip from '@mui/material/Chip';
import { MakeStudyButton, MakeBoardContainer } from './MakeBoardComp';

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

const UpdateFormStyle = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    .TagsWrapper {
        display: flex;
        gap: 10px;
        margin-top: 10px;
        flex-wrap: wrap;
    }
    .als {
        align-self: flex-start;
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
        onSuccess: async (x) => {
            console.log(x)
            setValue('title', x.title);
            setValue('content', x.content);
            setValue('headCount', x.headCount);
            setValue('schedule', x.schedule);
            Tags.length === 0 && x.tags.forEach((tag) => {
                setTags(prev=>[...prev,{id:Math.random(),val:tag}])
            });
            setstartDay(x.startDate);
            setendDay(x.endDate);
            setPreviewImg(x.profileImg);
            //const filename = x.profileImg.split('/').pop();
            //const blob = new Blob([x.profile],{type : `image/${filename.split('.').pop()}`});
            //const file = new File([x.profileImg], filename, {type : `image/${filename.split('.').pop()}`});
            //setThumbnail(file);
            //console.log(file)
        },
    });
    const [startDay, setstartDay] = useState(null);
    const [endDay, setendDay] = useState(null);
    const { register, handleSubmit, formState: {errors}, setValue } = useForm();
    const UpdateBoard = useMutation(['updateBoard', params.studyId], (data) => updateBoard(data,params.studyId,getCookie('accessToken')),{
        onSuccess: () => {
            navigate('/study/depart/cse');
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
        formData.append('startDate',startDay);
        formData.append('endDate',endDay);
        formData.append('studyMethod',data.method);
        formData.append('department',data.department);
        formData.append('tags',[Tags.map((tag)=>{return tag.val})]);
        formData.append('studyState',data.studyState);
        formData.append('title',data.title);
        UpdateBoard.mutate(formData);
    };

    const handleUpload = (e) => {
        const { files } = e.target;
        console.log(files);
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
        <MakeBoardContainer>
            <h1 style={{textAlign:'center'}}>수정 페이지</h1>
            <UpdateFormStyle onSubmit={handleSubmit(UpdateSubmitHandler)}>
            <FormControl sx={{ width: "100%", m: 1 }}>
                    <InputLabel htmlFor="outlined-study-name">스터디 이름</InputLabel>
                    <OutlinedInput 
                        id="outlined-study-name"
                        label="스터디 이름"
                        onKeyDown={(e)=>{CheckKeyDown(e)}}
                        {...register('title',{required:'스터디 이름을 입력해 주세요'})}
                    />
                    <FormHelperText sx={{color:'red'}}>{errors?.title?.message}</FormHelperText>
                </FormControl>
                <FormControl sx={{ width: "100%", m: 1 }}>
                    <InputLabel htmlFor="outlined-study-tags">스터디 주제</InputLabel>
                    <OutlinedInput 
                        id="outlined-study-tags"
                        label="스터디 주제"
                        onKeyDown={(e)=>handleTags(e)}
                        {...register('tags')}
                    />
                    <FormHelperText sx={{color:'#0049AF'}}>내용을 작성하고 엔터를 눌러보세요!</FormHelperText>
                    <div className="TagsWrapper" sx={{color:'blue'}}>{Tags?.map(tag=><Chip label={tag.val} onDelete={()=>TagsClickHandler(tag.id)} onClick={()=>TagsClickHandler(tag.id)} key={tag.id} />)}</div>
                </FormControl>
                <FormControl sx={{ width: "100%", m: 1 }}>
                    <InputLabel htmlFor="outlined-study-headCount">스터디 인원</InputLabel>
                    <OutlinedInput 
                        id="outlined-study-headCount"
                        label="스터디 인원"
                        type="number"
                        onKeyDown={(e)=>{CheckKeyDown(e)}}
                        {...register('headCount',{required:'스터디 인원을 입력해 주세요',pattern:{value:/^\d*[1-9]\d*$/, message:'0이상의 숫자만 입력해 주세요'}})}
                    />
                    <FormHelperText sx={{color:'red'}}>{errors?.headCount?.message}</FormHelperText>
                </FormControl>
                <FormControl sx={{ width: "100%", m: 1 }}> 
                    <TextField 
                        id="outlined-study-content"
                        label="스터디 내용"
                        multiline
                        fullWidth
                        onKeyDown={(e)=>{
                            if(e.key === 'Enter'){
                                if (!e.shiftKey){
                                    e.preventDefault();
                                }
                            }
                        }}
                        rows={5}
                        {...register('content',{required:'스터디 내용을 입력해 주세요'})}
                    />
                    <FormHelperText sx={{color:'red'}}>{errors?.content?.message}</FormHelperText>
                </FormControl>
                <LocalizationProvider dateAdapter={DateAdapter} sx={{m:1}}>
                    <DatePicker
                        label="스터디 시작날짜"
                        value={startDay}
                        onChange={(date)=>{
                            //setstartDay(date);
                            const [year,month,day] = [date.getFullYear(),date.getMonth()+1,date.getDate()];
                            setstartDay(`${year}-${month}-${day}`);
                        }}
                        renderInput={(params) => <TextField sx={{ width: "100%", m: 1 }} {...params} />}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={DateAdapter} >
                    <DatePicker
                        
                        label="스터디 종료날짜"
                        value={endDay}
                        onChange={(date)=>{
                            const [year,month,day] = [date.getFullYear(),date.getMonth()+1,date.getDate()];
                            setendDay(`${year}-${month}-${day}`);
                        }}
                        renderInput={(params) => <TextField sx={{ width: "100%", m: 1 }} {...params} />}
                    />
                </LocalizationProvider>
                <FormControl sx={{ width: "100%", m: 1 }}>
                    <select {...register('method')}>
                        <option value="FACE">대면</option>
                        <option value="NONFACE">비대면</option>
                        <option value="UNDEFINED">미정</option>
                    </select>
                </FormControl>
                <FormControl sx={{ width: "100%", m: 1 }}>
                    <select  {...register('department')}>
                        <option value="cse">컴퓨터공학부</option>
                        <option value="me">기계공학부</option>
                        <option value="eca">전기전자통신공학부</option>
                        <option value="dea">디자인,건축공학부</option>
                        <option value="mce">메카트로닉스공학부</option>
                        <option value="im">산업경영학부</option>
                        <option value="emce">에너지신소재화학공학부</option>
                        <option value="esp">고용서비스정책학부</option>
                        <option value="other">기타</option>
                    </select>
                </FormControl>
                <label htmlFor="studyState" className="als">스터디 상태</label>
                <select {...register('studyState')} style={{width: '100%'}}>
                    {study.map((x) => (
                        <option key={x.id} value={x.val}>{x.val}</option>
                    ))}
                </select>
                <label htmlFor="recruitState" className="als">모집 상태</label>
                <div className='als'>
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
                </div>
                {previewImg === '' ? null : <img src={previewImg} alt="preview" style={{width:'20%'}}/>}
                <label htmlFor="contained-button-file">
                    <input style={{display:'none'}} accept="image/*" id="contained-button-file" name="thumbNailImg" type="file" onChange={handleUpload}/>
                    <Button variant="contained" component="span" sx={{m:2}}>
                        썸네일 이미지 선택
                    </Button>
                </label>
                <MakeStudyButton variant="contained" type="submit">수정</MakeStudyButton>
            </UpdateFormStyle>
        </MakeBoardContainer>
    )
}

export default UpdateStudy;
