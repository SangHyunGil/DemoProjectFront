import React, { useEffect, useState } from "react";
import { useQueryClient, useQuery } from "react-query";
//import { useSelector } from "react-redux";
import { getMailMember } from "../Api/Api";
import { getCookie } from "../utils/cookie";
import { Outlet, NavLink } from "react-router-dom";
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
    .active {
      background-color: #fdf9f3;
    }
    a {
      display: block;
      text-decoration: none;
      padding: 1rem 2rem;
      color: black;
      &:hover {
        background-color: #daecf3;
      }
    }
    .messageInfo {
      display: flex;
      p {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:first-child {
          flex: 1;
        }
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
      retry: false,
    }
  );

  useEffect(() => {
    if (data) {
      setMyinfo(data?.data?.data);
    }
  }, [queryClient, data]);

  return (
    <MailWrapper>
      <div className="messageBox">
        <h2>쪽지함</h2>
        {MessageMember?.length > 0 ? (
          <>
            {MessageMember.map((item, index) => (
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                style={{ background: item.unReadCount > 0 && "#ffaeae"}}
                key={index}
                to={
                  myinfo?.id === item.senderId.memberId
                    ? `/mail/with/${item.receiverId.memberId}`
                    : `/mail/with/${item.senderId.memberId}`
                }
              >
                <h3>
                  {item.senderId.memberId === myinfo?.id
                    ? item.receiverId.nickname
                    : item.senderId.nickname}
                </h3>
                <div className="messageInfo">
                  <p>{item.content}</p>
                  <p>{item.unReadCount > 0 && `+${item.unReadCount}`}</p>
                </div>
              </NavLink>
            ))}
          </>
        ) : (
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
