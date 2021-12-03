import React from 'react';

const ChattingComp = ({contents, username, message,
                        sendMessage, setUsername, setMessage}) => {

    return (
        <div>
            <label htmlFor="username">송신자</label>
            <input id="username"value={username} onChange={e=>setUsername(e.target.value)}/>
            <label htmlFor="message">내용</label>
            <input id="message"value={message} onChange={e=>setMessage(e.target.value)}/>
            <button onClick={() =>sendMessage(username, message)}>전송</button>
            <div>
                {contents.map((message, idx) => (
                    <div key={idx}>{message.username} : {message.content}</div>
                ))}
            </div>

        </div>
    )
}

export default ChattingComp;