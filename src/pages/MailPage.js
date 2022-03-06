import React, { useEffect, useState } from "react";
import { useQueryClient, useQuery } from "react-query";
//import { useSelector } from "react-redux";
import { getMailMember } from "../Api/Api";
import { getCookie } from "../utils/cookie";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";

const MailWrapper = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  gap: 1rem;
  .messageBox {
    flex-basis: 40%;
    margin: 3rem 1rem;
    padding: 1rem 2rem;
    border: 1px solid #ededed;
    border-radius: 5px;
    overflow-y: auto;
    a {
      display: block;
      text-decoration: none;
      padding: 1rem 2rem;
      color: black;
      &:hover {
        background-color: #daecf3;
      }
    }
  }
  .message {
    flex-basis: 60%;
    margin: 3rem 1rem;
    padding: 1rem 2rem;
    border: 1px solid #ededed;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    .items {
      flex: 1 1 90%;
      overflow-y: auto;
    }
  }
`;

function MailPage() {
  const queryClient = useQueryClient();
  const [myinfo, setMyinfo] = useState(null);
  const data = queryClient.getQueryData("loadMyInfo");
  //const { password } = useSelector((state) => state.users);

  const { data: MessageMember } = useQuery(
    ["getMessageMember", myinfo?.id],
    () => getMailMember(getCookie("accessToken")),
    {
      select: (data) => data.data.data,
      onSuccess: (data) => {
        console.log(data);
      },
      retry: false,
    }
  );

  useEffect(() => {
    if (data) {
      setMyinfo(data?.data?.data);
    }
  }, [queryClient, data]);

  useEffect(() => {
    if (myinfo) {
      console.log(myinfo);
    }
  }, [myinfo]);

  return (
    <MailWrapper>
      <div className="messageBox">
        <h2>쪽지함</h2>
        {MessageMember?.length > 0 ? <>
          {MessageMember.map((item, index) => (
            <Link key={index} to={myinfo?.id === item.senderId.memberId ? `/mail/with/${item.receiverId.memberId}` : `/mail/with/${item.senderId.memberId}`}>
              <h3>{item.senderId.memberId === myinfo?.id ? item.receiverId.nickname : item.senderId.nickname}</h3>
              <p>{item.content}</p>
            </Link>        
          ))}
        </> : (
          <div>아직 대화상대가 없습니다..!</div>
        )}
      </div>
      <div className="message">
        <Outlet />
      </div>
    </MailWrapper>
  );
}

export default MailPage;
