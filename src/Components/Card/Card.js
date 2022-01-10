import React from 'react';
import styled from 'styled-components';

const MyCard = styled.div`
    background-color: white;
    box-shadow: 0 5px 8px rgba(0,0,0,0.5);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 300px;
    h3 {
        text-align: center;
    }
`;

const CardImgWrapper = styled.div`
    overflow: hidden;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    img {
        background-size: cover;
        width: 100%;
        height: 100%;
    }
`;

function Card(props) {
    return (
        <MyCard>
            <CardImgWrapper>
                <img src= {props.titleImg} alt="title img" />
            </CardImgWrapper>
            {props.children}
        </MyCard>
    )
}

export default Card;
