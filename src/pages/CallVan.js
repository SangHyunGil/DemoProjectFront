import React from 'react';
import Card from '../Components/Card/Card';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

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
    return (
        <CardWrapper>
            {CardContext.map(card => (<Link to={`${card.id}`}><Card key={card.id} titleImg={card.img}><h3>{card.title}</h3></Card></Link>))}
        </CardWrapper>
    )
}

export default CallVan;
