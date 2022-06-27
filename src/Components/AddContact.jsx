import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { addContactRoute } from '../utils/API';
import {useNavigate} from 'react-router-dom';

function getUser(){
  return JSON.parse(localStorage.getItem('chatUser'));
}
const AddContact = () => {
  const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(undefined);

    const addContact = async() => {
        await axios.post(addContactRoute, {user:user._id, contact:username})
        .then(res => {
          navigate("/contacts")
        })
        .catch(err => console.error(err));
    }

    useEffect(()=>{
      setUser(getUser());
    },[])

  return (
    <div>
      <input type="text"  placeholder="Username..."  name="username" onChange={(event)=>setUsername(event.target.value)}/>
      <button onClick={()=>addContact()}> Add</button>
    </div>
  )
}

export default AddContact
