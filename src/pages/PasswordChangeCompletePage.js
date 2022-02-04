import React from 'react';
import {Link} from 'react-router-dom';
import { AuthContainer } from '../Components/Signup/EmailAuth';

function PasswordChangeCompletePage() {
  return <>
    <AuthContainer>
                <img src="/AuthImg/cheers.png" alt="success" />
                <p>비밀번호 변경이 완료되었습니다.</p>
                <Link to="/">
                    <button>메인페이지 가기</button>
                </Link>
    </AuthContainer>
  </>;
}

export default PasswordChangeCompletePage;
