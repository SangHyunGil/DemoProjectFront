import React from 'react';
import styled from 'styled-components';

const MyCard = styled.div`
    background-color: white;
    box-shadow: 0px 0px 3px 0px rgb(0 0 0 / 50%);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 100%;
    padding: 1rem 0;
    &:hover {
        background-color: #f5f5f5;
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
                {props.titleImg && <img src= {props.titleImg} alt="title img" />}
            </CardImgWrapper>
            {props.children}
        </MyCard>
    )
}

export default Card;
