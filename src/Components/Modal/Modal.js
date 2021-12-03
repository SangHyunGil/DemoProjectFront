import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const ModalBackground = styled.div`
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContainer = styled.div`
    position: fixed;
    z-index: 100;
    background-color: white;
    width: 50%;
    top: 20%;
    left: 50%;
    transform: translate(-50%);
    border-radius: 10px;
    overflow: hidden;
`;

function Modal(props) {
    const navigate = useNavigate();
    
    const ModalOutsideHandler = (e) => {
        navigate('/');
    };

    return (
        <React.Fragment>
            <ModalBackground onClick={ModalOutsideHandler} />
            <ModalContainer>
                <header>
                    {props.title}
                </header>
                <main>
                    {props.message}
                    <button>로그인 하러 가기</button>
                </main>
            </ModalContainer>
        </React.Fragment>
    )
}

export default Modal;