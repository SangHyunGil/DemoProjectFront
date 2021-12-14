import React, {useEffect, useState} from 'react';
import {Outlet, useParams, Link, NavLink} from 'react-router-dom';
import Modal from '../../Components/Modal/Modal';
import useInput from '../../hooks/useInput';
import { useSelector} from "react-redux";
import {getBoardCategory,createBoardCategory} from '../../Api/Api';
import {useQuery} from 'react-query';
import {getCookie} from '../../utils/cookie';
import {CategoryWrapper,Category} from '../Categories/Categories';

function StudyBoard() {
    const [IsModalUp, setIsModalUp] = useState(false);
    const [NewBoardName, setNewBoardName] = useInput('');
    const [BoardCategory, setBoardCategory] = useState([]);
    const [IsGranted, setIsGranted] = useState(false);
    const {accessToken,studyInfos} = useSelector(state => state.users);
    const {studyId} = useParams();
    const {data:category} = useQuery(['getBoardCategory',studyId],()=>getBoardCategory(studyId,getCookie('accessToken')),{
        select: (cat) => cat.data.data,
        onSuccess: ()=>{
            const Role  = studyInfos.find(x=>x.studyId===Number(studyId))?.studyRole;
            console.log(Role);
            if (Role === 'CREATOR' || Role === 'ADMIN') {
                setIsGranted(true);
            }
            else {
                setIsGranted(false);
            }
        },
        retry: false,
    });

    const ModalUpHandler = () => {
        //모달 핸들러
        setIsModalUp(true);
    };

    const BoardSubmitHandler = (e) => {
        // submit시 
        e.preventDefault();
        createBoardCategory(studyId, NewBoardName,getCookie('accessToken'))
        .then(res => {
            const {data: {data}} = res;
            setBoardCategory([...BoardCategory, {studyBoardId: data.studyBoardId, title: data.title}]);
        }).catch(err => {console.log(err)});
        setIsModalUp(false);
    };
    /*
    useEffect(() => {
        // 카테고리 불러오기
        getBoardCategory(studyId,accessToken).then(res => {
            const {data:{data}} = res;
            setBoardCategory(()=>[...data]);
            const Role  = studyInfos.find(x=>x.studyId===Number(studyId))?.studyRole;
            if (Role === 'CREATOR' || Role === 'ADMIN') {
                setIsGranted(true);
            }
            else {
                setIsGranted(false);
            }
        });
    },[studyId,accessToken,studyInfos]);*/

    return (
        <>
            {IsModalUp && 
            <Modal title={<h1>게시판 작성</h1>} ModalHandler={()=>{setIsModalUp(false)}}>
                <form onSubmit={BoardSubmitHandler}>
                    <input type="text" placeholder="게시판 이름" value={NewBoardName} onChange={setNewBoardName}/>
                    <button type="submit">생성</button>
                </form>
            </Modal>}
            <CategoryWrapper>
                {category?.map((cat) => (<Category activeclassname="active" to={`/study/${studyId}/board/${cat.studyBoardId}/articles`} key={cat.studyBoardId}>{cat.title}</Category>))}
                {IsGranted && <Category to={`/study/${studyId}/board/manage`}>게시판 관리</Category>}
            </CategoryWrapper>
            <Outlet />
            <button onClick={ModalUpHandler} >게시판 추가</button>
        </>
    )
}

export default StudyBoard;
