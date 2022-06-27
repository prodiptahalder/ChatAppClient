import React, {useEffect, useState} from 'react';
import {SocketRequest} from '../utils/Socket';
import axios from 'axios';
import {loginRoute} from '../utils/API';
import {useNavigate, Link} from 'react-router-dom';


const LoginPage = () => {
    const[data, setData] = useState({username:"", password:""});
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('chatUser')) navigate("/contacts")
    },[])
    const inputhandler = (event) => {
        event.preventDefault();
        setData({...data, [event.target.name]:event.target.value});
    }
    const submit = async  () => {
        await axios.post(loginRoute, data)
        .then((response) => {
            localStorage.setItem('chatUser', JSON.stringify(response.data.user));
            SocketRequest({type:"add-user", body:{
              username:response.data.user._id
            }});
            navigate("/contacts", { replace: false });
        })
        .catch(err => {
            console.error(err)
            
        });
    }
  return (
    <div>
      <input type="text" placeholder="Username..."  name="username" onChange={(event)=>inputhandler(event)}/>
      <input type="password" placeholder="Password"  name="password" onChange={(event)=>inputhandler(event)}/>
      <button onClick={()=>submit()}>Login</button>
      <span>New user? <Link to={`/`}>Register</Link></span>
    </div>
  )
}

export default LoginPage
