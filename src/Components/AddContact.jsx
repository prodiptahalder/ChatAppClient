import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { addContactRoute } from '../utils/API';
import {useNavigate} from 'react-router-dom';
import phonebook from '../images/phonebook.svg';

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
    <div className="contacts-main-container">
      <div style={{width: '80%', margin:"auto", textAlign:"center"}}>
        <img src={phonebook} className="contactIcon" alt="Contact Book"/>
        <h3 style={{color:'white', fontSize:'1.5rem', fontWeight:'bold'}}>Contact's Username:</h3>
        <input className="form-control mb-4 " type="text"  placeholder="Enter Username..."  name="username" onChange={(event)=>setUsername(event.target.value)}/>
        <button className="btn btn-outline-info"onClick={()=>addContact()}> Add Contact</button>
      </div>
    </div>
  )
}

export default AddContact
