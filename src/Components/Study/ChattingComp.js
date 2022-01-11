import React from 'react';

const ChattingComp = ({contents, username, message,
                        sendMessage, setMessage}) => {

    return (
        <div>
            <label htmlFor="message">내용</label>
            <input id="message"value={message} onChange={e=>setMessage(e.target.value)}/>
            <button onClick={() =>sendMessage(message)}>전송</button>
            <div>
                {contents.map((message, idx) => (
                    <div key={idx}>{message.memberName} : {message.content}</div>
                ))}
            </div>
        </div>
    )
}

export default ChattingComp;