import React,{useState} from 'react';
import Card from '../Components/Card/Card';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Modal from '../Components/Modal/Modal';

const CardContext = [
    {id:0, img: 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', title: '정문 콜밴 파티원'}, 
    {id:1, img:'https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',title:'콜밴=콜라 밴'}
];

const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(6,1fr);
    grid-template-rows: repeat(2,1fr);
    grid-auto-rows: 1fr;
    grid-gap: 10px;
    margin: 10px 10%;
    justify-items: center;
    @media (max-width: 900px) {
        grid-template-columns: repeat(4,1fr);
        grid-template-rows: repeat(2,1fr);
    }
`;

function CallVan() {
    const [IsModalUp, setIsModalUp] = useState(false);

    const ModalUPHandler = () => {
        setIsModalUp(true);
    }

    return (
        <React.Fragment>
            {IsModalUp && <Modal title={<p>채팅방 생성</p>} m
            essage={<p>채팅방을 생성합니다</p>} ModalHandler={()=>{setIsModalUp(false)}}><input></input></Modal>}
            <button onClick={ModalUPHandler}>생성</button>
            <CardWrapper>
                {CardContext.map(card => (<Link key={card.id} to={`${card.id}`}>
                <Card  titleImg={card.img}><h3>{card.title}</h3></Card>
                </Link>))}
            </CardWrapper>
        </React.Fragment>
    )
}

export default CallVan;
