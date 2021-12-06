import React, {useState} from 'react';
import {Link, Outlet} from 'react-router-dom';
import Modal from '../../Components/Modal/Modal';
import useInput from '../../hooks/useInput';

function StudyBoard() {
    const [IsModalUp, setIsModalUp] = useState(false);
    const [NewBoardName, setNewBoardName] = useInput('');

    const ModalUpHandler = () => {
        //모달 핸들러
        setIsModalUp(true);
    };

    const BoardSubmitHandler = (e) => {
        // submit시 
        e.preventDefault();
        setIsModalUp(false);
    };

    return (
        <>
            {IsModalUp && 
            <Modal title={<h1>게시판 작성</h1>} ModalHandler={()=>{setIsModalUp(false)}}>
                <form onSubmit={BoardSubmitHandler}>
                    <input type="text" placeholder="게시판 이름" value={NewBoardName} onChange={setNewBoardName}/>
                    <button type="submit">생성</button>
                </form>
            </Modal>}
            <Link to="notice">공지사항</Link>
            <Link to="free">자유게시판</Link>
            <Outlet />
            <button onClick={ModalUpHandler} >게시판 추가</button>
        </>
    )
}

export default StudyBoard;
