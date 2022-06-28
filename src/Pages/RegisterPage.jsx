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
    <div className="text-center">
          <div className="formInitial">
            <h1 className="h3 mb-3 fw-normal">Register to get started</h1>

            <div className="form-floating">
            <input type="email" className="form-control" placeholder="Email..."  name="email" onChange={(event)=>inputhandler(event)}/>
              <label for="floatingInput">Email</label>
            </div>

            <div className="form-floating">
            <input type="text" className="form-control" placeholder="Username..."  name="username" onChange={(event)=>inputhandler(event)}/>
              <label for="floatingInput">Username</label>
            </div>

            <div className="form-floating">
              <input type="password" className="form-control" placeholder="Password"  name="password" onChange={(event)=>inputhandler(event)}/>
              <label for="floatingPassword">Password</label>
            </div>

            <div className="form-floating">
            <input type="password" className="form-control" placeholder="Confirm Password"  name="password1" onChange={(event)=>inputhandler(event)}/>
              <label for="floatingPassword">Confirm Password</label>
            </div>

            <div className="checkbox mb-3">
            </div>
            <button className="w-100 btn btn-lg btn-primary" onClick={()=>submit()}>Register</button>
            <span>Already a user? <Link to={`/login`}>Login</Link></span>
          </div>
    </div>
  )
}

export default RegisterPage
