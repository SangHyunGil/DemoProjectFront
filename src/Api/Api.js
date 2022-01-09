import axios from "axios";
import { getCookie } from "../utils/cookie";

export const findAllRooms = async () => {
  return await axios.get("/room");
};

export const findBoard = async (boardId) => {
  return await axios.get(`/study/${boardId}`);
};

export const findAllBoards = async (studyId,department,size) => {
  return await axios.get("/study",{
    params: {
      studyId: studyId,
      department: department,
      size: size
    }
  });
};

export const findUserBoard = async (accessToken) => {
  if (!accessToken) {
    accessToken = getCookie("accessToken");
  }
  return await axios.post(
    `/users/info`,
    {},
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );
};

export const updateBoard = async (data,studyId,accessToken) => {
  if (!accessToken) {
    accessToken = getCookie("accessToken");
  }
  return await axios.put(
    `/study/${studyId}`,
    data,
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
        'Content-Type': 'multipart/form-data'
      },
    }
  );
};

export const deleteBoard = async (studyId,accessToken) => {
  if (!accessToken) {
    accessToken = getCookie("accessToken");
  }
  return await axios.delete(
    `/study/${studyId}`,
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );
};

export const getUserProfileInfo = async (memeberId, accessToken) => {
  if (!accessToken) {
    accessToken = getCookie("accessToken");
  }
  return await axios.get(`/users/${memeberId}`, {
    headers: {
      "X-AUTH-TOKEN": accessToken,
    },
  });
};

export const join = async (boardId, memberId, applyContent, accessToken) => {
  return await axios.post(
    `/study/${boardId}/join/${memberId}`,{
        applyContent
    },
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );
};

export const createRoom = async (roomName, memberId, accessToken) => {
  return await axios.post(
    "/room",
    {
      roomName: roomName,
      memberId: memberId,
    },
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );
};

export const createBoard = async (
  data,accessToken
) => {
  return await axios.post(
    "/study",
    data,
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const findAllChats = async (roomId, accessToken) => {
  return await axios.get("/room/" + roomId, {
    headers: {
      "X-AUTH-TOKEN": accessToken,
    },
  });
};

export const getBoardCategory = async (studyId, accessToken) => {
  accessToken = accessToken ? accessToken : getCookie("accessToken");
  if (!accessToken) {
    return;
  }
  return await axios.get(`/study/${studyId}/board`, {
    headers: {
      "X-AUTH-TOKEN": accessToken,
    },
  });
};

export const createBoardCategory = async (studyId, title, accessToken) => {
  return await axios.post(
    `/study/${studyId}/board`,
    { title: title },
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );
};

export const getStudyInfo = async (studyId) => {
  return await axios.get(`/study/${studyId}`);
};

export const createBoardArticle = async (
  studyId,
  boardId,
  ContentObj,
  accessToken
) => {
  console.log(ContentObj);
  return await axios.post(
    `/study/${studyId}/board/${boardId}/article`,
    {
      title: ContentObj.title,
      content: ContentObj.content,
      memberId: ContentObj.memberId,
    },
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );
};

export const findAllBoardArticles = async (studyId, boardId, accessToken) => {
  return await axios.get(`/study/${studyId}/board/${boardId}/article`, {
    headers: {
      "X-AUTH-TOKEN": accessToken,
    },
  });
};

export const deleteBoardArticle = async (
  studyId,
  boardId,
  articleId,
  accessToken
) => {
  return await axios.delete(
    `/study/${studyId}/board/${boardId}/article/${articleId}`,
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );
};

export const updateBoardArticle = async (
  studyId,
  boardId,
  articleId,
  content,
  title,
  accessToken
) => {
  return await axios.put(
    `/study/${studyId}/board/${boardId}/article/${articleId}`,
    {
      content: content,
      title: title,
    },
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );
};

export const getArticlePost = async (
  studyId,
  boardId,
  articleId,
  accessToken
) => {
  if (!accessToken) {
    accessToken = getCookie("accessToken");
  }
  return await axios.get(
    `/study/${studyId}/board/${boardId}/article/${articleId}`,
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );
};

export const updateArticlePost = async (
  studyId,
  boardId,
  articleId,
  data,
  accessToken
) => {
  if (!accessToken) {
    accessToken = getCookie("accessToken");
  }
  return await axios.put(
    `/study/${studyId}/board/${boardId}/article/${articleId}`,
    {
      content: data.content,
      title: data.name,
    },
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );
};

export const getStudyMembers = async (studyId, accessToken) => {
  return await axios.get(`/study/${studyId}/member`, {
    headers: {
      "X-AUTH-TOKEN": accessToken,
    },
  });
};

export const grantStudyMember = async (studyId, memberId, accessToken) => {
  return await axios.put(
    `/study/${studyId}/join/${memberId}`,{

    },
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );
};

export const rejectStudyMember = async (studyId, memberId, accessToken) => {
    return await axios.delete(
        `/study/${studyId}/join/${memberId}`,
        {
        headers: {
            "X-AUTH-TOKEN": accessToken,
        },
        }
    );
};

export const updateProfileInfo = async (data,memberId,accessToken) => {
  return await axios.put(
    `/users/${memberId}`,
    data,
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
        "Content-Type": "multipart/form-data",
      },
    }
  );

};