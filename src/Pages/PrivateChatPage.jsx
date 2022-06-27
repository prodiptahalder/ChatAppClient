import React, {useState, useEffect, useRef} from 'react';
import { socket, SocketRequest} from '../utils/Socket';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { getMessages, postMessage } from '../utils/API';

function getUser(){
    return JSON.parse(localStorage.getItem('chatUser'));
  }

const PrivateChatPage = () => {
    const navigate = useNavigate();
    const bottom = useRef(null);
    const [user, setUser] = useState(undefined);
    const [message, setMessage] = useState("");
    const [arrived, setArrived] = useState(undefined);
    const [chats, setChats] = useState([]);
    const {username, id} = useParams();

    useEffect(()=>{
        if(!(localStorage.getItem('chatUser'))){
            navigate("/login");
          }
        async function setUp () {
            const user = await getUser();
            setUser(user);
            SocketRequest({type:"add-user", body:{
                username:user._id
              }});
            await axios.get(`${getMessages}/${id}/${user._id}`)
            .then(res => {
                if(res && res.data && res.data.chats){
                    setChats(res.data.chats);
                }
            })
            .catch(err => console.error(err));
        }
        if (socket){
            socket.on("receive_private_message", (data) => {
                setArrived(data);
            });
        }
        setUp();
      }, []);

      useEffect(() => {
        if(arrived!==undefined) setChats((prev) => [...prev, {...arrived, to:{username: user.username}, from:{username:username}}]);
      }, [arrived]);

      const scrollToBottom = () => {
        bottom.current.scrollIntoView({behavior : "smooth"})
      }

      useEffect(()=>{
        scrollToBottom();
      },[chats])

    const sendMessage = async () => {
        if(message!==''){
            SocketRequest({type:"send_private_message", body:{message : message, to : id, from : user._id}});
            await axios.post(postMessage, {message : message, to : id, from : user._id})
            .then(res => {
                if(res && res.data && res.data.chat){
                    const newChats = chats.slice();
                    newChats.push({...res.data.chat, to:{username}, from:{username:user.username}});
                    setChats(newChats);
                }
            })
            setMessage('');
        }
    }

  return (
    <div>
      <input placeholder="Message..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
        <ul style={{height:"50vh", overflowY:"scroll", border: "1px solid"}}>
            {chats && chats.length > 0 && chats.map((data, i) => (
                <li>{data.from.username}:{data.message}</li>
            ))}
            <div ref={bottom}></div>
        </ul>
    </div>
  )
}

export default PrivateChatPage
