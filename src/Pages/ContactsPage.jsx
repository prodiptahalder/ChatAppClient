import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getContactDetails } from '../utils/API';
import {SocketRequest} from '../utils/Socket';
import {Link, useNavigate} from 'react-router-dom';

function getUser(){
  return JSON.parse(localStorage.getItem('chatUser'));
}

const ContactsPage = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  useEffect(()=>{
    if(!(localStorage.getItem('chatUser'))){
      navigate("/login");
    }
    async function setUp(){
      const user= await getUser();
      SocketRequest({type:"add-user", body:{
        username:user._id
      }});
      axios.get(`${getContactDetails}/${user._id}`)
      .then(res => {
        if(res && res.data && res.data.user){
          setContacts(res.data.user.contacts);
        }
      })
      .catch(err => console.error(err));
    }
    setUp();
  },[])

  const logout = () => {
    localStorage.removeItem('chatUser');
    navigate('/login');
  }

  return (
    <div>
      <ul>
      {contacts && contacts.map((contact, i) => 
        (<li key={i} className="">
          <Link to={`/chat/${contact.username}/${contact._id}`}>{contact.username}</Link>
        </li>)
      )}
      </ul>
      <Link to={`/add`}>Add contact</Link>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default ContactsPage
