import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter as Router,
        Routes,
        Route} from 'react-router-dom';
import Temp from './Components/Temp';
//import { useNavigate } from 'react-router';
import { findUserBoard } from './Api/Api';
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
import { useQuery } from 'react-query';
import StudyCalendar from './Components/Study/StudyCalendar';
import PasswordChangeCompletePage from './pages/PasswordChangeCompletePage';

const App = () => {
  //let navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, isChecked } = useSelector(
    (state) => state.users
  );

  const result = useQuery(['loadMyInfo'],()=>findUserBoard(getCookie('accessToken')),{
    enabled: isLogin,
  });

  useEffect(() => {
    if (!isChecked) {
      if(getCookie('accessToken')){
        checkAccessToken(dispatch);
      }
      //console.log("refresh Page");
      console.log(isLogin);
    }
  });

  return (
    <>
      <Router>
        <Categories>
          <div id="main-content">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/signup/verify" element={<EmailAuthPage />} />
              <Route path="/changepassword" element={<PrivateRoute><ChangePasswordPage /></PrivateRoute>} />
              <Route path="/signup/findpassword" element={<FindPasswordPage />} />
              <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} >
                <Route path="accountInfo" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="mystudy" element={<PrivateRoute><MyStudy /></PrivateRoute>} />
                <Route path="mycallvan" element={<PrivateRoute><h1>마이 콜밴 페이지</h1></PrivateRoute>} />
                <Route path="mymarket" element={<PrivateRoute><h1>마이 마켓 페이지</h1></PrivateRoute>} />
              </Route>
              <Route path="/temp" element={<PrivateRoute><Temp /></PrivateRoute>} />
              <Route path="/callvan" element={<PrivateRoute><CallVan /></PrivateRoute>} />
              <Route path="/callvan/:id" element={<PrivateRoute><h1>하위 페이지!</h1></PrivateRoute>} />
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