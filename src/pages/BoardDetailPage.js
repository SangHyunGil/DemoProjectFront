import React from "react";
import BoardDetail from "../Components/Study/BoardDetail"
import { useParams } from "react-router";
import styled from "styled-components";

const BoardDetailPageWrapper = styled.div`
`;

const BoardDetailPage = () => {
    const params = useParams();

    return (
        <BoardDetailPageWrapper>
            <BoardDetail boardId = {params.boardId}/>
        </BoardDetailPageWrapper>
    )
}

export default BoardDetailPage;