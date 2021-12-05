import axios from "axios";

export const findAllRooms = async () => {
    return await axios.get("/room");
};

export const findBoard = async (boardId) => {
    return await axios.get("/board/"+boardId);
};

export const findAllBoards = async () => {
    return await axios.get("/board");
};

export const findUserBoard = async (userId, accessToken) => {
    return await axios.get(`users/${userId}`,{
        headers: {
            "X-AUTH-TOKEN": accessToken
        }
    });
}

<<<<<<< HEAD
=======
export const findBoard = async (boardId) => {
    return await axios.get("/board/"+boardId);
}

export const findAllBoards = async () => {
    return await axios.get("/board");
}

>>>>>>> ac4e7f85578b31ec2cfed51b95df402ea6fea75f
export const join = async (boardId, memberId, accessToken) => {
    return await axios.post("/board/join", {
        boardId: boardId,
        memberId: memberId
    }, {
        headers: {
            "X-AUTH-TOKEN": accessToken
        }
    })
<<<<<<< HEAD
};
=======
}
>>>>>>> ac4e7f85578b31ec2cfed51b95df402ea6fea75f

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
    return await axios.post("/board", {
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

export const createBoard = async (title, topic, headCount, studyState, recruitState, id, accessToken) => {
    return await axios.post("/board", {
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
}

export const findAllChats = async (roomId, accessToken) => {
    return await axios.get("/room/"+roomId, {
        headers: {
            "X-AUTH-TOKEN": accessToken
        }
    });
};