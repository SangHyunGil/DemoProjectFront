import React, {useEffect, useState} from 'react'; 
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import WebSocketComp from '../Components/WebSocketComp';

let socket = new SockJS("http://localhost:8080/test");
let stompClient = Stomp.over(socket);
stompClient.debug= () => {};

function WebSocketPage () { 
    const [contents, setContents] = useState([]);
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    const addMessage = (message) => {
        console.log("before : ", contents, "-", message);
        setContents((contents)=>[...contents, message])
        console.log("after : ", contents);
    };

    const sendMessage = (username, content) => {
        const newMessage = {
            "username" : username,
            "content" : content
        };
        stompClient.send("/app/test/1",{},JSON.stringify(newMessage));
        setMessage("");
    };

    const connect = () => {
        stompClient.connect({},
            () => {
                stompClient.subscribe("/topic/1", (payload) => {
                    const body = JSON.parse(payload.body);
                    addMessage(body)
                })
        });
    }

    useEffect(() => {
        console.log("useEffect");
        connect();
    }, [contents])

    return ( 
        <div> 
            <WebSocketComp contents={contents} username={username} message={message}
                           sendMessage={sendMessage} setUsername={setUsername} setMessage={setMessage} />
        </div> 
    ); } 
        
export default WebSocketPage;