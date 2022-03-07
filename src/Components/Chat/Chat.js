import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { loadSenderMessage, writeMessage, getUserProfileInfo } from "../../Api/Api";
import { getCookie } from "../../utils/cookie";
import { useForm } from "react-hook-form";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styled from "styled-components";

const MessageInputFormStyle = styled.form`
  .inputWrapper {
    padding: 0.5rem 1rem;
    display: inline-block;
    border-radius: 5px;
    background-color: #f3f4f6;
    display: flex;
    input {
      border: 0;
      background-color: transparent;
      &:focus {
        outline: none;
      }
      flex: 1;
    }
  }
`;

const ChatWrapper = styled.div`
  border-bottom: 1px solid #e6e6e6;
  padding: 1rem 0;
  .mychat {
    color: skyblue;
  }
  .otherchat {
    color: #ffc107;
  }
  .mychat,.otherchat {
    margin-bottom: 10px;
  }
`;

function Chat() {
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const myinfo = queryClient.getQueryData("loadMyInfo");
  const { register, handleSubmit, setValue } = useForm();

  const { data: SendersMessage, isLoading } = useQuery(
    ["loadSendersMessage", userId],
    () => loadSenderMessage(userId, getCookie("accessToken")),
    {
      select: (data) => data.data.data,
      refetchInterval: 1000,
    }
  );

  const {data:userData} = useQuery(["getUserProfileInfo",userId],()=>getUserProfileInfo(userId,getCookie("accessToken")),{
    select: (data) => data.data.data, 
  }); 

  const writeMessageMutation = useMutation(
    ({ content, receiverId, senderId }) =>
      writeMessage({ content, receiverId, senderId }, getCookie("accessToken")),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["loadSendersMessage", userId]);
        queryClient.invalidateQueries([
          "getMessageMember",
          myinfo?.data?.data?.id,
        ]);
      },
    }
  );

  const messageSendHandler = (data) => {
    console.log(data);
    writeMessageMutation.mutate({
      content: data.message,
      receiverId: userId,
      senderId: myinfo?.data?.data?.id,
    });
    setValue("message", "");
  };

  return (
    <>
      <div>
        <h1>{userData?.nickname}</h1>
      </div>
      <div className="items">
        {!isLoading && SendersMessage?.length > 0 ? (
          SendersMessage?.map((msg, index) => (
            <ChatWrapper key={index}>
              <p
                className={
                  msg.senderId === myinfo?.data.data.id ? "mychat" : "otherchat"
                }
              >
                {msg.senderId === myinfo?.data.data.id
                  ? "보낸 메세지"
                  : "받은 메세지"}
              </p>
              <p>{msg.content}</p>
            </ChatWrapper>
          ))
        ) : (
          <div>아직 내용이 없습니다!</div>
        )}
      </div>
      <MessageInputFormStyle onSubmit={handleSubmit(messageSendHandler)}>
        <div className="inputWrapper">
          <input
            {...register("message", { required: true })}
            placeholder="메세지를 입력해 주세요!"
          />
          <IconButton type="submit">
            <SendIcon />
          </IconButton>
        </div>
      </MessageInputFormStyle>
    </>
  );
}

export default Chat;
