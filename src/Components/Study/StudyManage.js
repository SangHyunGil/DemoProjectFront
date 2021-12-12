import React,{useState} from 'react';
import styled from 'styled-components';
import Modal,{ModalContainer} from '../Modal/Modal';
import {useQuery,useMutation,useQueryClient} from 'react-query';
import {useParams} from 'react-router-dom'
import {getBoardCategory,createBoardCategory} from '../../Api/Api';
import { useSelector } from "react-redux";
import useInput from '../../hooks/useInput';
import {getCookie} from '../../utils/cookie';

const StudyManageContainer = styled.section`
    width: 100%;
    margin: 3rem 0;
`;
const StudyMemberManageContainer = styled.section`
    width: 70%;
    margin: 0 auto;
    padding: .5rem 1rem;
    box-shadow: 0 0 10px -1px rgba(0,0,0,0.2);
    h2 {
        margin: 0;
    }
    div {
        border-bottom: 1px solid #e6e6e6;
    }
`;
const StudyBoardManageContainer = styled(StudyMemberManageContainer)`
    margin-top: 1rem;
`;

const StudyModal = styled.section`
    padding: 1rem;
`;

function StudyManage() {
    const [IsBoardModalUp, setIsBoardModalUp] = useState(false);
    const [AddBoardValue,AddBoardOnChange,setAddBoardValue] = useInput('');
    const {studyId} = useParams();
    const {accessToken} = useSelector(state => state.users);
    const queryClient = useQueryClient();
    
    const {data:board} = useQuery(['boardManage', studyId], ()=>getBoardCategory(studyId,getCookie('accessToken')), {
        select: (x) => x.data.data,
        retry: false,
    });
    
    const AddBoardMutation = useMutation((title)=>createBoardCategory(studyId,title,getCookie('accessToken')),{
        onSuccess: ()=>{
            queryClient.invalidateQueries(['boardManage', studyId]);
            queryClient.invalidateQueries(['getBoardCategory',studyId]);
        }
    });

    const ModalUpHandler = () => {
        //모달 핸들러
        setIsBoardModalUp(true);
    };

    const BoardAddHandler = (e) => {
        e.preventDefault();
        AddBoardMutation.mutate(AddBoardValue);
        setAddBoardValue('');
        setIsBoardModalUp(false);
    }

    return (
        <StudyManageContainer>
            <StudyMemberManageContainer>
                <h2>스터디원 관리</h2>
                <div>
                    <p>스터디원들</p>
                </div>
                <div>
                    <p>지원자</p>
                </div>
            </StudyMemberManageContainer>
            {IsBoardModalUp && <StudyModal>
                <Modal title="게시판 추가" ModalHandler={()=>setIsBoardModalUp(false)}>
                    <form onSubmit={BoardAddHandler}>
                        <input type="text" placeholder="제목" onChange={AddBoardOnChange} value={AddBoardValue} />
                        <button type="submit">게시판 추가</button>
                    </form>
                    <button onClick={()=>setIsBoardModalUp(false)}>닫기</button>
                </Modal></StudyModal>}
            <StudyBoardManageContainer>
                <h2>게시판 관리</h2>
                <ul>
                    {board?.map((b)=> (<li key={b.studyBoardId}>{b.title}</li>))}
                </ul>
                <button onClick={ModalUpHandler} >게시판 추가</button>
            </StudyBoardManageContainer>
        </StudyManageContainer>
    )
}

export default StudyManage;
