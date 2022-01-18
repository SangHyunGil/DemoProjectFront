import React from 'react';
import styled from 'styled-components';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";

const StudyDetailCardWrapper = styled(Card)`
    position: absolute;
    min-width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

function StudyDetailCard(props) {
    return (
        <StudyDetailCardWrapper>
            <h1>Hi</h1>
        </StudyDetailCardWrapper>
    )
}

export default StudyDetailCard;
