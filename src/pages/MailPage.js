import React, { useEffect, useState } from "react";
import { useQueryClient, useQuery } from "react-query";
//import { useSelector } from "react-redux";
import { getMailMember } from '../Api/Api';
import { getCookie } from "../utils/cookie";
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const MailWrapper = styled.div`
  width: 70vw;
  max-width: 1000px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  margin: 2rem auto;
  padding: 1rem;
  border-radius: 5px;
  hr {
    border: 0;
    border-top: 1px solid #ccc;
  }
`;

function MailPage() {
  const queryClient = useQueryClient();
  const [myinfo, setMyinfo] = useState(null);
  const data = queryClient.getQueryData("loadMyInfo");
  //const { password } = useSelector((state) => state.users);

  const {data:MessageMember} = useQuery(['getMessageMember',myinfo?.id],()=>getMailMember(getCookie('accessToken')),{
    select: (data) => data.data.data,
    onSuccess: (data) => {
        console.log(data);
    },
    retry: false,
  });   

  useEffect(() => {
    if (data) {
      setMyinfo(data?.data?.data);
    }
  }, [queryClient, data]);

  useEffect(() => {
    if (myinfo) {
      console.log(myinfo);
    }
  },[myinfo]);

  return (<MailWrapper>
    {MessageMember?.length > 0 ? null : <div>아직 대화상대가 없습니다..!</div>}
    <hr />
    <Outlet />
  </MailWrapper>);
}

export default MailPage;
