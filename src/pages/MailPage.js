import React, { useEffect, useState } from "react";
import { useQueryClient, useQuery } from "react-query";
//import { useSelector } from "react-redux";
import { getMailMember } from '../Api/Api';
import { getCookie } from "../utils/cookie";

function MailPage() {
  const queryClient = useQueryClient();
  const [myinfo, setMyinfo] = useState(null);
  const data = queryClient.getQueryData("loadMyInfo");
  //const { password } = useSelector((state) => state.users);

  const MessageMember = useQuery(['getMessageMember',myinfo?.id],()=>getMailMember(getCookie('accessToken')),{
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

  return <div>MailPage</div>;
}

export default MailPage;
