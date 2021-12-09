import React from "react";
import BoardDetail from "../Components/Study/BoardDetail"
import { useParams } from "react-router";

const BoardDetailPage = () => {
    const params = useParams();

    return (
        <div>
            <BoardDetail studyId = {params.studyId}/>
        </div>
    )
}

export default BoardDetailPage;