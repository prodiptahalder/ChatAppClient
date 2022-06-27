import React, {useState, useEffect} from 'react';
import {socket, SocketRequest} from '../utils/Socket';
import {useParams} from 'react-router-dom';


const ChatOnetoOne = () => {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const {username} = useParams();

    useEffect(()=>{
        socket.on("receive_private_message", (data) => {
          setMessageReceived(data.message);
        });
      }, [socket]);

    const sendMessage = () => {
        SocketRequest({type:"send_private_message", body:{message : message, to : username}});
    }

  return (
    <div>
      <input placeholder="Message..."
        onChange={(event) => setMessage(event.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
        <h1>Message: </h1>
        {messageReceived}
    </div>
  )
}

export default ChatOnetoOne
