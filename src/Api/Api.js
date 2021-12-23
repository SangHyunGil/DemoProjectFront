import axios from "axios";
import {getCookie} from '../utils/cookie';

export const findAllRooms = async () => {
    return await axios.get("/room");
};

export const findBoard = async (boardId) => {
    return await axios.get("/study/"+boardId);
};

export const findAllBoards = async () => {
    return await axios.get("/study");
};

export const findUserBoard = async (accessToken) => {
    if (!accessToken) {
        accessToken = getCookie('accessToken');
    }
    return await axios.post(`/users/info`,{},{
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

export const getBoardCategory = async (studyId,accessToken) => {
    accessToken = accessToken ? accessToken : getCookie('accessToken');
    if(!accessToken) {
        return;
    }
    return await axios.get(`/study/${studyId}/board`,{
        headers: {
            "X-AUTH-TOKEN": accessToken
        }
    });
};

export const createBoardCategory = async (studyId,title,accessToken) => {
    return await axios.post(`/study/${studyId}/board`,
    { title : title},{
            headers: {
                "X-AUTH-TOKEN": accessToken
            }
        }
    );
};

export const getStudyInfo = async (studyId) => {
    return await axios.get(`/study/${studyId}`);
}

export const createBoardArticle = async (studyId,boardId,ContentObj,accessToken) => {
    console.log(ContentObj);
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

export const findAllBoardArticles = async (studyId, boardId, accessToken) => {
    return await axios.get(`/study/${studyId}/board/${boardId}/article`,{
        headers: {
            "X-AUTH-TOKEN": accessToken
        }
    });
};

export const deleteBoardArticle = async (studyId, boardId, articleId, accessToken) => {
    return await axios.delete(`/study/${studyId}/board/${boardId}/article/${articleId}`,{
        headers: {
            "X-AUTH-TOKEN": accessToken
        }
    });
};

export const updateBoardArticle = async (studyId, boardId, articleId, content,title, accessToken) => {
    return await axios.put(`/study/${studyId}/board/${boardId}/article/${articleId}`, {
        content: content,
        title: title
    },{
        headers: {
            "X-AUTH-TOKEN": accessToken
        }
    });
};

export const getArticlePost = async (studyId, boardId, articleId, accessToken) => { 
    if (!accessToken) {
        accessToken = getCookie('accessToken');
    }
    return await axios.get(`/study/${studyId}/board/${boardId}/article/${articleId}`,{
        headers: {
            "X-AUTH-TOKEN": accessToken
        }
    });
};

export const updateArticlePost = async (studyId, boardId, articleId,data, accessToken) => {
    if (!accessToken) {
        accessToken = getCookie('accessToken');
    }
    return await axios.put(`/study/${studyId}/board/${boardId}/article/${articleId}`, {
        content: data.content,
        title: data.name
    },{
        headers: {
            "X-AUTH-TOKEN": accessToken
        }
    });  
};

export const getStudyMembers = async (studyId, accessToken) => {
    return await axios.get(`/study/${studyId}/member`,{
        headers: {
            "X-AUTH-TOKEN": accessToken
        }
    });
};