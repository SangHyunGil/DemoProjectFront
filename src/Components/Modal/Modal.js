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
    return (
        <React.Fragment>
            <ModalBackground onClick={props.ModalHandler} />
            <ModalContainer>
                <header>
                    {props.title}
                </header>
                <main>
                    {props.message}
                    {props.children}
                </main>
            </ModalContainer>
        </React.Fragment>
    )
}

export default Modal;