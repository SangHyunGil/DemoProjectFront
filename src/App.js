import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter as Router,
        Routes,
        Route} from 'react-router-dom';
import Temp from './Components/Temp';
//import { useNavigate } from 'react-router';
import { checkAccessToken } from './utils/jwt'
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import EmailAuthPage from './pages/EmailAuthPage';
import SignUpCompletePage from './pages/SignUpComplete';
import MainPage from './pages/MainPage';
import FindPasswordPage from './pages/FindPassword';
import ChangePasswordPage from './pages/ChangePassword';
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

const App = () => {
  //let navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, isChecked } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (!isChecked) {
      //console.log("refresh Page");
      checkAccessToken(dispatch);
      console.log(isLogin);
    }
  });

  return (
    <div>
      <Router>
        <Categories />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup/verify" element={<EmailAuthPage />} />
          <Route path="/signup/password" element={<ChangePasswordPage />} />
          <Route path="/signup/findpassword" element={<FindPasswordPage />} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} >
            <Route path="accountInfo" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="mystudy" element={<PrivateRoute><MyStudy /></PrivateRoute>} />
            <Route path="mycallvan" element={<PrivateRoute><h1>마이 콜밴 페이지</h1></PrivateRoute>} />
            <Route path="mymarket" element={<PrivateRoute><h1>마이 마켓 페이지</h1></PrivateRoute>} />
            <Route path="updateStudyInfo/:id" element={<PrivateRoute><UpdateStudy /></PrivateRoute>} />
          </Route>
          <Route path="/temp" element={<PrivateRoute><Temp /></PrivateRoute>} />
          <Route path="/callvan" element={<PrivateRoute><CallVan /></PrivateRoute>} />
          <Route path="/callvan/:id" element={<PrivateRoute><h1>하위 페이지!</h1></PrivateRoute>} />
          <Route path="/signup/complete" element={<SignUpCompletePage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<div>Not Found</div>} />
          <Route path="/study" element={<BoardPage />} />
          <Route path="/study/create" element={<MakeBoardPage />} />
          <Route path="/study/:boardId" element={<BoardDetailPage />} />
          <Route path="/study/:studyId/board" element={<StudyBoard />} >
            <Route path=":boardId/articles" element={<BoardArticles />} />
            <Route path=":boardId/article/:articleId" element={<BoardArticlesPost />} />
            <Route path=":boardId/article/:articleId/edit" element={<BoardArticlePostEdit />} />
            <Route path="manage" element={<StudyManage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;