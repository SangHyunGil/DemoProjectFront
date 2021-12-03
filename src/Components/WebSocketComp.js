import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';

const WebSocketComp = ({contents, username, message,
                        sendMessage, setUsername, setMessage}) => {

    return (
        <div>
            <input value={username} onChange={e=>setUsername(e.target.value)}/>
            <input value={message} onChange={e=>setMessage(e.target.value)}/>
            <button onClick={() =>sendMessage(username, message)}>전송</button>
            <div>
                {contents.map((message, idx) => (
                    <div key={idx}>{message.username} : {message.content}</div>
                ))}
            </div>

        </div>
    )
}

export default WebSocketComp;