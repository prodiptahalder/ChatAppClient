import React from 'react';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

const socket = io.connect(`${process.env.SERVER}`);

const Chat = () => {
    const [message, setMessage] = useState("");
    const [room, setRoom] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const navigate = useNavigate();
    // useEffect(() => {
    //     const user = localStorage.getItem('chatUser');
    //     if(!user) navigate("/login")
    //     else{
    //         const userObj=JSON.parse(user);
    //         socket.emit("add-user", userObj.username);
    //     }
    // },[])
  
    const joinRoom = () => {
      if(room !== ""){
        socket.emit("join_room", room);
      }
    }
  
    const leaveRoom = () => {
      if(room !== ""){
        socket.emit("leave_room", room);
      }
    }
  
    const sendMessage = () => {
      socket.emit("send_message", {message : message, room : room});
    }
  
    useEffect(()=>{
      console.log("I was called from room");
      socket.on("receive_message", (data) => {
        setMessageReceived(data.message);
      });
    }, [socket]);
  
    return (
      <div className="App">
        <input placeholder="Room..."
        onChange={(event) => setRoom(event.target.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
        <br/>
        <input placeholder="Message..."
        onChange={(event) => setMessage(event.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
        <h1>Message: </h1>
        {messageReceived}
      </div>
    );
}

export default Chat
