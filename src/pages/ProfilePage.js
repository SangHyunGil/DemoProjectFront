import React, {useEffect} from "react";
import Profile from "../Components/MyPage/Profile";
import {Outlet, Link,useNavigate, NavLink} from 'react-router-dom';
import styled from "styled-components";
import { motion } from "framer-motion";

const ProfilePageWrapper = styled.div`
    display: flex;
    border-bottom: 2px solid #e6e6e6;
    padding: 10px 30px 8px 30px;
`;

const ProfilePageLinks = styled(NavLink)`
  cursor: pointer;
  text-decoration: none;
  white-space: pre;
  color: black;
  font-family: "OTWelcomeBA", sans-serif;
  font-size: 1.1rem;
    &:hover {
        color: #ffc107;
    }
    &.active {
        color: #ffc107;
        border-bottom: 2px solid #ffc107;
        &:hover {
            color: #13C6DC;
        }
    }
  & + & {
    margin-left: 1rem;
  }
`;

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

const ProfilePage = () => {
  //const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/profile/accountInfo');
  }, [])
  return (
    <>
      <ProfilePageWrapper> 
        <ProfilePageLinks activeclassname="active" to="/profile/accountInfo">Profile</ProfilePageLinks>
        <ProfilePageLinks activeclassname="active" to="/profile/mystudy">내스터디</ProfilePageLinks>
        <ProfilePageLinks activeclassname="active" to="/profile/mycallvan">내콜밴</ProfilePageLinks>
        <ProfilePageLinks activeclassname="active" to="/profile/mymarket">내장터</ProfilePageLinks>
      </ProfilePageWrapper>
      <Outlet />
    </>
  );
};

export default ProfilePage;