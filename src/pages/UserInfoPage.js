import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useParams,useNavigate } from 'react-router-dom';
import { getUserProfileInfo } from '../Api/Api';
import { getCookie } from '../utils/cookie';
import styled from 'styled-components';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { Tooltip } from '@mui/material';

const UserInfoWrapper = styled.div`
  width: 70vw;
  max-width: 1000px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  margin: 2rem auto;
  padding: 1rem;
  border-radius: 5px;
  header {
    display: flex;
    justify-content: space-between;
    svg {
      &:hover {
        cursor: pointer;
      }
    }
  }
  .main {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    .imgContainer {
      width: 150px;
      height: 150px;
      border: 1px;
      border-radius: 5px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .introduction {
    margin-top: 1rem;
    p {
      margin-top: 1rem;
      white-space: pre-line;
    }
  }
  @media (max-width: 490px) {
    .main {
      flex-direction: column;
      align-items: center;
      .textContainer {
        text-align: center;
      }
    }
  }
`;

function UserInfoPage() {
  const { id } = useParams();
  const [isMyInfo, setIsMyInfo] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const myData = queryClient.getQueryData('MyInfo');
  const { data: userInfo } = useQuery(['userInfo', id], ()=>getUserProfileInfo(id,getCookie('accessToken')), {
    select: (data) => data.data.data,
  });

  useEffect(() => {
    if (myData && userInfo) {
      if (myData?.data?.data?.id === userInfo?.id) {
        setIsMyInfo(true);
      }
    }
  },[myData, userInfo]);

  return (
    <>
    <UserInfoWrapper>
      <header>
        <h2>프로필</h2>
        {!isMyInfo && (<Tooltip title="쪽지 보내기" arrow><ForwardToInboxIcon onClick={
          () => navigate(`/mail/with/${id}`)
        }/></Tooltip>)}
      </header>
      <section className="main">
        <div className="imgContainer">
          <img src={userInfo?.profileImgUrl} alt="profileImg" />
        </div>
        <div className="textContainer">
          <h3>{userInfo?.nickname}</h3>
          <p>{userInfo?.department}</p>
          <p>{userInfo?.email}@koreatech.ac.kr</p>
        </div>
      </section>
      <hr />
      <section className="introduction">
        <h3>자기 소개</h3>
        <p>{userInfo?.introduction}</p>
      </section>
    </UserInfoWrapper>
    </>
  )
}

export default UserInfoPage;