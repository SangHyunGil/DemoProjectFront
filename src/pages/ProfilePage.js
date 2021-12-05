import React, {useEffect} from "react";
import Profile from "../Components/MyPage/Profile";
<<<<<<< HEAD
import {Outlet, Link,useNavigate, NavLink} from 'react-router-dom';
import styled from "styled-components";

const ProfilePageWrapper = styled.div`
    display: flex;
    border-bottom: 2px solid #e6e6e6;
`;

const ProfilePageLinks = styled(NavLink)`
  cursor: pointer;
  text-decoration: none;
  white-space: pre;
    &:hover {
        color: #ffc107;
    }
    &.active {
        border-bottom: 2px solid #ffc107;
        &:hover {
            color: #13C6DC;
        }
    }
  & + & {
    margin-left: 1rem;
  }
`;
=======
import {Outlet, Link, Routes,Route, useNavigate} from 'react-router-dom';

>>>>>>> ac4e7f85578b31ec2cfed51b95df402ea6fea75f

const ProfilePage = () => {
  //const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/profile/accountInfo');
  }, [])
  return (
<<<<<<< HEAD
    <>
      <ProfilePageWrapper> 
        <ProfilePageLinks activeclassname="active" to="/profile/accountInfo">Profile</ProfilePageLinks>
        <ProfilePageLinks activeclassname="active" to="/profile/mystudy">내스터디</ProfilePageLinks>
        <ProfilePageLinks activeclassname="active" to="/profile/mycallvan">내콜밴</ProfilePageLinks>
        <ProfilePageLinks activeclassname="active" to="/profile/mymarket">내장터</ProfilePageLinks>
      </ProfilePageWrapper>
      <Outlet />
=======
    <> 
       <Link to="/profile/accountInfo">Profile</Link>
       <Link to="/profile/mystudy">마이스터디</Link>
       <Outlet />
>>>>>>> ac4e7f85578b31ec2cfed51b95df402ea6fea75f
    </>
  );
};

export default ProfilePage;