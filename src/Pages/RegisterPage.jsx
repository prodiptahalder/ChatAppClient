import React, {useState, useEffect} from 'react';
import {SocketRequest} from '../utils/Socket';
import axios from 'axios';
import {registerRoute} from '../utils/API';
import {useNavigate, Link} from 'react-router-dom';

const RegisterPage = () => {
    const[data, setData] = useState({email:"", username:"", password:"", password1:""});
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('chatUser')) navigate("/contacts")
    },[])
    const inputhandler = (event) => {
        event.preventDefault();
        setData({...data, [event.target.name]:event.target.value});
    }
    const submit = async  () => {
        await axios.post(registerRoute, data)
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
      <input type="email" placeholder="Email..."  name="email" onChange={(event)=>inputhandler(event)}/>
      <input type="text" placeholder="Username..."  name="username" onChange={(event)=>inputhandler(event)}/>
      <input type="password" placeholder="Password"  name="password" onChange={(event)=>inputhandler(event)}/>
      <input type="password" placeholder="Confirm Password"  name="password1" onChange={(event)=>inputhandler(event)}/>
      <button onClick={()=>submit()}>Login</button>
      <span>Already a user? <Link to={`/login`}>Login</Link></span>
    </div>
  )
}

export default RegisterPage
