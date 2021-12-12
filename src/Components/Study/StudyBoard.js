import React, {useEffect, useState} from 'react';
import {Outlet, useParams, Link} from 'react-router-dom';
import Modal from '../../Components/Modal/Modal';
import useInput from '../../hooks/useInput';
import { useSelector} from "react-redux";
import {getBoardCategory,createBoardCategory} from '../../Api/Api';

function StudyBoard() {
    const [IsModalUp, setIsModalUp] = useState(false);
    const [NewBoardName, setNewBoardName] = useInput('');
    const [BoardCategory, setBoardCategory] = useState([]);
    const {accessToken,studyInfos} = useSelector(state => state.users);
    const {studyId} = useParams();
    
   

    const ModalUpHandler = () => {
        //모달 핸들러
        setIsModalUp(true);
    };

    const BoardSubmitHandler = (e) => {
        // submit시 
        e.preventDefault();
        createBoardCategory(studyId, NewBoardName,accessToken)
        .then(res => {
            const {data: {data}} = res;
            setBoardCategory([...BoardCategory, {studyBoardId: data.studyBoardId, title: data.title}]);
        }).catch(err => {console.log(err)});
        setIsModalUp(false);
    };

    useEffect(() => {
        // 카테고리 불러오기
        getBoardCategory(studyId,accessToken).then(res => {
            const {data:{data}} = res;
            setBoardCategory(()=>[...data]);
        });
    },[studyId,accessToken]);

    return (
        <>
            {IsModalUp && 
            <Modal title={<h1>게시판 작성</h1>} ModalHandler={()=>{setIsModalUp(false)}}>
                <form onSubmit={BoardSubmitHandler}>
                    <input type="text" placeholder="게시판 이름" value={NewBoardName} onChange={setNewBoardName}/>
                    <button type="submit">생성</button>
                </form>
            </Modal>}
            {BoardCategory.map((cat) => (<Link to={`/study/${studyId}/board/${cat.studyBoardId}/articles`} key={cat.studyBoardId}>{cat.title}</Link>))}
            <Outlet />
            <button onClick={ModalUpHandler} >게시판 추가</button>
        </>
    )
}

export default StudyBoard;
