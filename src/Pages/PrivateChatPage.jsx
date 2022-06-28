import React, {useState, useEffect, useRef} from 'react';
import { socket, SocketRequest} from '../utils/Socket';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { getMessages, postMessage } from '../utils/API';
import ChatPop from '../Components/ChatPop';
import send from '../images/send.svg';

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
                    newChats.push({...res.data.chat, to:{username, _id:id}, from:{username:user.username, _id:user._id}});
                    setChats(newChats);
                }
            })
            setMessage('');
        }
    }

  return (
    <div className="contacts-main-container">
      <div className="header-box">
        <h3 className="headings">{username} </h3>
        {/* <button className="btn btn-outline-danger" onClick={logout}>Logout</button> */}
      </div>
      <div className="chat-subWindow">
        <div className="chat-container">
            {chats && chats.length > 0 && chats.map((data, i) => (
              <ChatPop key={i} data={data} user={user}/>
            ))}
            <div ref={bottom}></div>
        </div>
        <div className="send-div">
          <input placeholder="Type Message..." className="send-input form-control" styles={{display: 'inline-block', width: '90%'}}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            />
            <img className="send-button" src={send} onClick={sendMessage}/>
        </div>
      </div>
      
    </div>
  )
}

export default PrivateChatPage
