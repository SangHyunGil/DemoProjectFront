import React, {useEffect} from 'react'
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
<<<<<<< HEAD
import WebSocketPage from "./pages/WebSocketPage"
=======
import PrivateRoute from './Components/PrivateRouter/PrivateRoute';
import Logout from './Components/Logout/Logout';
import Categories from './Components/Categories/Categories';
>>>>>>> 6f5524479c2f04c723a0c22f6f1e197f0282488c

const App = () => {
  //let navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, isChecked } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (!isChecked) {
<<<<<<< HEAD
      console.log("refresh Page");
=======
      //console.log("refresh Page");
>>>>>>> 6f5524479c2f04c723a0c22f6f1e197f0282488c
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
<<<<<<< HEAD
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/temp" element={<Temp />} />
          <Route path="/signup/complete" element={<SignUpCompletePage />} />
          <Route path="/websocket" element={<WebSocketPage />} />
=======
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/temp" element={<PrivateRoute><Temp /></PrivateRoute>} />
          <Route path="/callvan" element={<PrivateRoute><h1>콜밴</h1></PrivateRoute>} />
          <Route path="/signup/complete" element={<SignUpCompletePage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<div>Not Found</div>} />
>>>>>>> 6f5524479c2f04c723a0c22f6f1e197f0282488c
        </Routes>
      </Router>
    </div>
  );
}

export default App;