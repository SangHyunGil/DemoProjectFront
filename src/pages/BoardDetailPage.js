import React from "react";
import BoardDetail from "../Components/Study/BoardDetail"
import { useParams } from "react-router";

const BoardDetailPage = () => {
    const params = useParams();

    return (
        <div>
            <BoardDetail boardId = {params.boardId}/>
        </div>
    )
}

export default BoardDetailPage;