import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter as Router,
        Routes,
        Route} from 'react-router-dom';
import Temp from './Components/Temp';
import { useNavigate } from 'react-router';
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

const App = () => {
  //let navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, isChecked } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (!isChecked) {
      console.log("refresh Page");
      checkAccessToken(dispatch);
    }
  }, [isLogin, isChecked]);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup/verify" element={<EmailAuthPage />} />
          <Route path="/signup/password" element={<ChangePasswordPage />} />
          <Route path="/signup/findpassword" element={<FindPasswordPage />} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/temp" element={<PrivateRoute><Temp /></PrivateRoute> } />
          <Route path="/signup/complete" element={<SignUpCompletePage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;