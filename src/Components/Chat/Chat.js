import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { loadSenderMessage, writeMessage } from "../../Api/Api";
import { getCookie } from "../../utils/cookie";
import { useForm } from "react-hook-form";
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import styled from "styled-components";

const MessageInputFormStyle = styled.form`
    .inputWrapper {
        padding: 0.5rem 1rem; 
        display: inline-block;
        border-radius: 5px;
        background-color: #F3F4F6;
        input {
            border: 0;
            background-color: transparent;
            &:focus {
                outline: none;
            }
        }
    }
`;

const ChatWrapper = styled.div`
    .myChat {
        display: flex;
        justify-content: flex-end;
    }
    .otherChat {
        display: flex;
        justify-content: flex-start;
    }
`;

function Chat() {
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const myinfo = queryClient.getQueryData("loadMyInfo");
  const { register, handleSubmit, setValue } = useForm();
  const { data: SendersMessage,isLoading } = useQuery(
    ["loadSendersMessage", userId],
    () =>loadSenderMessage(userId, getCookie("accessToken")),
    {
        select: (data) => data.data.data,
        refetchInterval: 1000,
    });
  const writeMessageMutation = useMutation(
    ({ content, receiverId, senderId }) =>
      writeMessage(
        { content, receiverId, senderId },
        getCookie("accessToken")),
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["loadSendersMessage", userId]);
            queryClient.invalidateQueries(['getMessageMember',myinfo?.data?.data?.id]);
          },
        }
  );

  const messageSendHandler = (data) => {
    console.log(data);
    writeMessageMutation.mutate({content: data.message, receiverId: userId, senderId: myinfo?.data?.data?.id});
    setValue("message", "");
  };

  return (
    <>
    {!isLoading && SendersMessage?.length > 0 ? SendersMessage?.map((msg,index) => (
            <ChatWrapper key={index}>
                <div className={msg.senderId === myinfo?.data.data.id ? 'myChat' : 'otherChat'} >{msg.content}</div>
            </ChatWrapper>
        )) : <div>아직 내용이 없습니다!</div>}
      <MessageInputFormStyle onSubmit={handleSubmit(messageSendHandler)} >
        <div className="inputWrapper">
            <input {...register('message',{required:true})} placeholder="메세지를 입력해 주세요!" />
            <IconButton type="submit">
              <SendIcon />  
            </IconButton>
        </div>
      </MessageInputFormStyle>
    </>
  );
}

export default Chat;
