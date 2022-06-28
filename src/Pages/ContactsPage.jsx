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
    <div className="contacts-main-container">
      <div className="header-box">
        <h3 className="headings">Contacts </h3>
        <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
      </div>
      
      {contacts && contacts.length>0?
      (<ul className="list-group list-group-flush contacts-container">
      {contacts && contacts.map((contact, i) => 
        (<li key={i} className="list-group-item chat-list-item" onClick={()=> navigate(`/chat/${contact.username}/${contact._id}`)}>
          {contact.username}
        </li>)
      )}
      </ul>):
      (
        <div className="list-group list-group-flush contacts-container">
        <div className="list-group-item chat-list-item text-center">
          Add Contacts to Start Chatting
          <br/>
          <button className="btn btn-info add-contact text-white" onClick={()=>navigate('/add')}>Add contact</button>
        </div>
      </div>
      )
      }
      {contacts && contacts.length>0 && <button className="btn btn-outline-info add-contact" onClick={()=>navigate('/add')}>Add contact</button>}
    </div>
  )
}

export default ContactsPage
