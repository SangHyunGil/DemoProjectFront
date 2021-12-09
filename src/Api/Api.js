import axios from "axios";

export const findAllRooms = async () => {
    return await axios.get("/room");
};

export const findBoard = async (studyId) => {
    return await axios.get("/study/"+studyId);
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

export const join = async (studyId, memberId, accessToken) => {
    return await axios.post("/study/join", {
        studyId: studyId,
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

export const createBoard = async (title, topic, headCount, studyState, recruitState, id, accessToken) => {
    return await axios.post("/study", {
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