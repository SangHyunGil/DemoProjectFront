import React, {useState} from 'react';
import styled from 'styled-components';
import Card from "@mui/material/Card";
import {Link} from 'react-router-dom';
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

const StudyDetailCardHeader = styled(CardHeader)`

`;

function StudyDetailCard({id,StudyData}) {
    const [StudyDetailData, setStudyDetailData] = useState(
        StudyData ? StudyData.data.find(item=> item.studyId === id) : null
    );
    return (
        <StudyDetailCardWrapper>
            <StudyDetailCardHeader avatar={<Avatar src={StudyDetailData?.creator?.profileImgUrl}
                              alt="profileimg" />}  
                              title={StudyDetailData?.title}
                              subheader={StudyDetailData?.creator.nickname} />
            <CardMedia
                component="img"
                height="194"
                image={StudyDetailData?.profileImg}
                alt="study-img"
            />
            <CardContent>
                <p>{StudyDetailData?.content}</p>
                <p>{StudyDetailData?.startDate}~{StudyDetailData?.endDate}</p>
                <p>현재원/총원:{StudyDetailData?.joinCount}/{StudyDetailData?.headCount}</p>
            </CardContent>
            <Link to={`/study/${id}`}>보러가기</Link>
        </StudyDetailCardWrapper>
    )
}

export default StudyDetailCard;
