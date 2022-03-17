import axios from "axios";
import { getCookie } from "../utils/cookie";
import { spring_server } from "../utils/config";

export const findAllRooms = async () => {
  return await axios.get("/api/rooms");
};

export const findBoard = async (boardId) => {
  return await axios.get(`/api/studies/${boardId}`);
};

export const findAllBoardsTotal = async (pageParam) => {
  return await axios.get(`/api/studies?studyId=${pageParam?.studyId}&department=${pageParam?.department}&size=${pageParam?.size}`);
};

export const findAllBoardsPreview = async (studyId,department,size) => {
  return await axios.get("/api/studies",{
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
    `/api/users/info`,
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
    `/api/studies/${studyId}`,
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
    `/api/studies/${studyId}`,
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
  return await axios.get(`/api/users/${memeberId}`, {
    headers: {
      "X-AUTH-TOKEN": accessToken,
    },
  });
};

export const join = async (boardId, memberId, applyContent, accessToken) => {
  return await axios.post(
    `/api/studies/${boardId}/joins/${memberId}`,{
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
    "/api/rooms",
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
    "/api/studies",
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
  return await axios.get("/api/rooms/" + roomId, {
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
  return await axios.get(`/api/studies/${studyId}/boards`, {
    headers: {
      "X-AUTH-TOKEN": accessToken,
    },
  });
};

export const createBoardCategory = async (studyId, title, accessToken) => {
  return await axios.post(
    `/api/studies/${studyId}/boards`,
    { title: title },
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );
};

export const getStudyInfo = async (studyId) => {
  return await axios.get(`/api/studies/${studyId}`);
};

export const createBoardArticle = async (
  studyId,
  boardId,
  ContentObj,
  accessToken
) => {
  //console.log(ContentObj);
  return await axios.post(
    `/api/studies/${studyId}/boards/${boardId}/articles`,
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

export const findAllBoardArticles = async (studyId, boardId,page,size,accessToken) => {
  return await axios.get(`/api/studies/${studyId}/boards/${boardId}/articles`, {
    params: {
      page: page,
      size: size
    },
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
    `/api/studies/${studyId}/boards/${boardId}/articles/${articleId}`,
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
    `/api/studies/${studyId}/boards/${boardId}/articles/${articleId}`,
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
    `/api/studies/${studyId}/boards/${boardId}/articles/${articleId}`,
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
    `/api/studies/${studyId}/boards/${boardId}/articles/${articleId}`,
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
  return await axios.get(`/api/studies/${studyId}/members`, {
    headers: {
      "X-AUTH-TOKEN": accessToken,
    },
  });
};

export const grantStudyMember = async (studyId, memberId, accessToken) => {
  return await axios.put(
    `/api/studies/${studyId}/joins/${memberId}`,{

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
        `/api/studies/${studyId}/joins/${memberId}`,
        {
        headers: {
            "X-AUTH-TOKEN": accessToken,
        },
        }
    );
};

export const updateProfileInfo = async (data,memberId,accessToken) => {
  return await axios.put(
    `/api/users/${memberId}`,
    data,
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
        "Content-Type": "multipart/form-data",
      },
    }
  );

};

export const getAllComments = async (studyId, boardId, articleId, accessToken) => {
  return await axios.get(`/api/studies/${studyId}/boards/${boardId}/articles/${articleId}/comments`, {
    headers: {
      "X-AUTH-TOKEN": accessToken,
    },
  });
};

export const createComment = async (studyId, boardId, articleId, data, accessToken) => {
  return await axios.post(
    `/api/studies/${studyId}/boards/${boardId}/articles/${articleId}/comments`,
    {
      content: data.content,
      memberId: data.memberId,
      parentCommentId: data.parentCommentId,
    },
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );
};

export const deleteComment = async (studyId, boardId, articleId, commentId, accessToken) => {
  return await axios.delete(`/api/studies/${studyId}/boards/${boardId}/articles/${articleId}/comments/${commentId}`,{
    headers: {
      "X-AUTH-TOKEN": accessToken,
    }
  });
};

export const updateComment = async (studyId, boardId, articleId, commentId, content, accessToken) => {
  //console.log(content);
  return await axios.put(
    `/api/studies/${studyId}/boards/${boardId}/articles/${articleId}/comments/${commentId}`,
    {
      content : content
    },
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );
};

export const getMyStudyInfo = async (accessToken) => {
  return await axios.get(`/api/studies/joins`,{
    headers: {
      "X-AUTH-TOKEN": accessToken,
    },
  });
};

export const updateBoardCategory = async (studyId, boardId,title,accessToken) => {
  return await axios.put(
    `/api/studies/${studyId}/boards/${boardId}`,
    {
      title
    },
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );
};

export const deleteBoardCategory = async (studyId, boardId,accessToken) => {
  return await axios.delete(`/api/studies/${studyId}/boards/${boardId}`,{
    headers: {
      "X-AUTH-TOKEN": accessToken,
    }
  });
};

export const changepassword = async (data,accessToken) => {
  return await axios.post(`/api/users/password`,data,{
    headers: {
      "X-AUTH-TOKEN": accessToken,
    }
  });
};

export const createStudySchedule = async (studyId, data, accessToken) => {
  return await axios.post(
    `/api/studies/${studyId}/schedules`,
    data,
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );
};

export const getStudySchedule = async (studyId, accessToken) => {
  return await axios.get(`/api/studies/${studyId}/schedules`, {
    headers: {
      "X-AUTH-TOKEN": accessToken,
    },
  });
};

export const updateStudySchedule = async (studyId, scheduleId, data, accessToken) => {
  return await axios.put(
    `/api/studies/${studyId}/schedules/${scheduleId}`,
    data, {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );
};

export const deleteStudySchedule = async (studyId, scheduleId, accessToken) => {
  return await axios.delete(`/api/studies/${studyId}/schedules/${scheduleId}`, {
    headers: {
      "X-AUTH-TOKEN": accessToken,
    }
  });
};

export const createVideoRoom = async (studyId, request,accessToken) => {
  return await axios.post(`/api/studies/${studyId}/videorooms`, 
      request,{
        headers: {
          "X-AUTH-TOKEN": accessToken,
        },
      }
  );
};

export const findVideoRooms = async (studyId,accessToken) => {
  return await axios.get(`/api/studies/${studyId}/videorooms`,{
    headers: {
      "X-AUTH-TOKEN": accessToken,
    }
  });
};

export const destroyVideoRoom = async (studyId,roomId,accessToken) => {
  return await axios.delete(`/api/studies/${studyId}/videorooms/${roomId}`,{
    headers: {
      "X-AUTH-TOKEN": accessToken,
    }
  });
};

export const getMailMember = async (accessToken) => {
  return await axios.get(`/api/messages`,{
    headers: {
      "X-AUTH-TOKEN": accessToken,
    }
  });
};

export const loadSenderMessage = async (userId,accessToken) => {
  return await axios.get(`/api/messages/sender?senderId=${userId}`,{
    headers: {
      "X-AUTH-TOKEN": accessToken,
    }
  });
};

export const writeMessage = async (data,accessToken) => {
  return await axios.post(`/api/messages`,data,{
    headers: {
      "X-AUTH-TOKEN": accessToken,
    }
  });
};

export const unreadMessage = async (accessToken) => {
  return await axios.get(`/api/messages/count`,{
    headers: {
      "X-AUTH-TOKEN": accessToken,
    }
  });
};

export const subscribe = async (accessToken) => {
  return await axios.get(`/api/subscribe`,{
    headers: {
      "X-AUTH-TOKEN": accessToken,
    }
  });
};

export const getNotification = async (accessToken) => {
  return await axios.get(`/api/notifications`,{
    headers: {
      "X-AUTH-TOKEN": accessToken,
    }
  });
};

export const getUnreadNotification = async (accessToken) => {
  return await axios.get(`/api/notifications/count`,{
    headers: {
      "X-AUTH-TOKEN": accessToken,
    }
  });
};

export const updateStudyMemberAuthority = async (studyId, memberId, authority, accessToken) => {
  return await axios.put(
    `/api/studies/${studyId}/authorities/${memberId}`,
    {
      studyRole: authority
    },
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );
};