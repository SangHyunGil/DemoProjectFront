import axios from "axios";

export const findAllRooms = async () => {
    return await axios.get("/room");
};

export const findBoard = async (boardId) => {
    return await axios.get("/study/"+boardId);
};

export const findAllBoards = async () => {
    return await axios.get("/study");
};

export const findUserBoard = async (userId, accessToken) => {
    return await axios.get(`users/${userId}`,{
        headers: {
            "X-AUTH-TOKEN": accessToken
        }
    });
}

export const join = async (boardId, memberId, accessToken) => {
    return await axios.post("/study/join", {
        studyId: boardId,
        memberId: memberId
    }, {
        headers: {
            "X-AUTH-TOKEN": accessToken
        }
    })
};

export const createRoom = async (roomName, memberId, accessToken) => {
    return await axios.post("/room", {
        roomName : roomName,
        memberId : memberId
    }, {
        headers: {
            "X-AUTH-TOKEN": accessToken
        }
    })
};

export const createBoard = async (content,title, topic, headCount, studyState, recruitState, id, accessToken) => {
    return await axios.post("/study", {
        content : content,
        title : title,
        topic : topic,
        headCount : headCount,
        studyState : studyState,
        recruitState : recruitState,
        memberId : id
    }, {
        headers: {
            "X-AUTH-TOKEN": accessToken
        }
    })
};

export const findAllChats = async (roomId, accessToken) => {
    return await axios.get("/room/"+roomId, {
        headers: {
            "X-AUTH-TOKEN": accessToken
        }
    });
};

export const getBoardCategory = async (studyId) => {
    return await axios.get(`/study/${studyId}/board`);
}

export const createBoardArticle = async (studyId, boardId,ContentObj,accessToken) => {
    return await axios.post(`/study/${studyId}/board/${boardId}/article`, {
        title: ContentObj.title,
        content: ContentObj.content,
        memberId: ContentObj.memberId,
    },{
        headers: {
            "X-AUTH-TOKEN": accessToken
        }
    });
};

export const findAllBoardArticles = async (studyId, boardId) => {
    return await axios.get(`/study/${studyId}/board/${boardId}/article`);
};