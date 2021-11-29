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

const App = () => {
  //let navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, isChecked } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (!isChecked) {
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
          <Route path="/temp" element={<Temp />} />
          <Route path="/signup/complete" element={<SignUpCompletePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;