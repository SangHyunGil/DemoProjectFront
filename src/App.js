import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter as Router,
        Routes,
        Route} from 'react-router-dom';
import Temp from './Components/Temp';
//import { useNavigate } from 'react-router';
import { findUserBoard, subscribe } from './Api/Api';
import { checkAccessToken } from './utils/jwt'
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import EmailAuthPage from './pages/EmailAuthPage';
import SignUpCompletePage from './pages/SignUpComplete';
import MainPage from './pages/MainPage';
import FindPasswordPage from './pages/FindPassword';
import ChangePasswordPage from './pages/ChangePasswordPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './Components/PrivateRouter/PrivateRoute';
import Logout from './Components/Logout/Logout';
import Categories from './Components/Categories/Categories';
import CallVan from './pages/CallVan';
import BoardPage from './pages/BoardPage';
import MakeBoardPage from './pages/MakeBoardPage';
import BoardDetailPage from './pages/BoardDetailPage'
import Profile from './Components/MyPage/Profile';
import MyStudy from './Components/Study/MyStudy';
import UpdateStudy from './Components/Study/UpdateStudy';
import StudyBoard from './Components/Study/StudyBoard';
import BoardArticles from './Components/Study/BoardArticles';
import BoardArticlesPost from './Components/Study/BoardArticlesPost';
import StudyManage from './Components/Study/StudyManage';
import BoardArticlePostEdit from './pages/BoardArticlePostEdit';
import { getCookie } from './utils/cookie';
import StudyDepartmentComp from './Components/Study/StudyDepartmentComp';
import AllDepartmentStudy from './pages/AllDepartmentStudy';
import { useQuery, useQueryClient } from 'react-query';
import StudyCalendar from './Components/Study/StudyCalendar';
import PasswordChangeCompletePage from './pages/PasswordChangeCompletePage';
import ProfileEditPage from './pages/ProfileEditPage';
import FindRoomPage  from './pages/FindRoomPage';
import CreateRoomPage from './pages/CreateRoomPage';
import VideoPage from './pages/VideoPage';
import AboutUsPage from './pages/AboutUsPage';
import MailPage from './pages/MailPage';
import UserInfoPage from './pages/UserInfoPage';
import Chat from './Components/Chat/Chat';
import { createBrowserHistory } from "history";

const App = () => {
  //let navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, isChecked } = useSelector(
    (state) => state.users
  );
  const queryClient = useQueryClient();
  const history = createBrowserHistory();

  const _ = useQuery(['loadMyInfo'],()=>findUserBoard(getCookie('accessToken')),{
    enabled: isLogin,
    onSuccess: (data) => {
      //console.log(data);
      queryClient.setQueryData('MyInfo', data);
    } 
  });
  
  useEffect(() => {
    if (!isChecked) {
      if(getCookie('accessToken')){
        checkAccessToken(dispatch);
      }
      //console.log("refresh Page");
      //console.log(isLogin);
    }
  });

  return (
    <>
      <Router>
        <Categories>
          <div id="main-content">
            <Routes history={history}>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/signup/verify" element={<EmailAuthPage />} />
              <Route path="/changepassword" element={<PrivateRoute><ChangePasswordPage /></PrivateRoute>} />
              <Route path="/signup/findpassword" element={<FindPasswordPage />} />
              <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} >
                <Route path="accountInfo" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="mystudy" element={<PrivateRoute><MyStudy /></PrivateRoute>} />
                <Route path="edit" element={<ProfileEditPage />} />
              </Route>
              <Route path='userinfo/:id' element={<UserInfoPage />} />
              <Route path="/temp" element={<PrivateRoute><Temp /></PrivateRoute>} />
              <Route path="/callvan" element={<PrivateRoute><CallVan /></PrivateRoute>} />
              <Route path="/signup/complete" element={<SignUpCompletePage />} />
              <Route path="/password/reset" element={<PasswordChangeCompletePage />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/study/:boardId" element={<BoardDetailPage />} />
              <Route path="/study" element={<BoardPage />} >
                <Route path="depart/:department" element={<StudyDepartmentComp />} />
                <Route path="depart/:department/all" element={<AllDepartmentStudy />} />
              </Route>
              <Route path="/study/create" element={<PrivateRoute><MakeBoardPage /></PrivateRoute>} />
              <Route path="/study/:studyId/edit" element={<PrivateRoute><UpdateStudy /></PrivateRoute>} />
              <Route path="/study/:studyId/board" element={<PrivateRoute><StudyBoard /></PrivateRoute>} >
                <Route path=":boardId/articles" element={<BoardArticles />} />
                <Route path=":boardId/article/:articleId" element={<PrivateRoute><BoardArticlesPost /></PrivateRoute>} />
                <Route path=":boardId/article/:articleId/edit" element={<PrivateRoute><BoardArticlePostEdit /></PrivateRoute>} />
                <Route path="manage" element={<PrivateRoute><StudyManage /></PrivateRoute>} />
                <Route path="calendar" element={<StudyCalendar />} />
                <Route path="create" element={<CreateRoomPage />} />
                <Route path="rooms" element={<FindRoomPage />} />
                <Route path="rooms/:roomId" element={<VideoPage />} />
              </Route>
              <Route path='/aboutus' element={<AboutUsPage />} />
              <Route path='/mail' element={<MailPage />} >
                <Route path="with/:userId" element={<Chat />} />
              </Route> 
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </div>
        </Categories>
      </Router>
    </>
  );
}

export default App;