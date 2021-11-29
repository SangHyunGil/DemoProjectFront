import React from 'react';
import { Link } from "react-router-dom";
const Temp = () => {
    
    return (
        <div>
            <Link to="/login">로그인</Link> <b/>
            <Link to="/signUp">회원가입</Link> <b/>
            <Link to="/temp">인증필요한곳</Link>
        </div>
    )
}

export default Temp;