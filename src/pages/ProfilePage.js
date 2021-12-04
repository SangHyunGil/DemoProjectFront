import React, {useEffect} from "react";
import Profile from "../Components/MyPage/Profile";
import {Outlet, Link, Routes,Route, useNavigate} from 'react-router-dom';


const ProfilePage = () => {
  //const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/profile/accountInfo');
  }, [])
  return (
    <> 
       <Link to="/profile/accountInfo">Profile</Link>
       <Link to="/profile/mystudy">마이스터디</Link>
       <Outlet />
    </>
  );
};

export default ProfilePage;