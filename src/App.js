import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AddContactPage from './Pages/AddContactPage';
import ChatPage from './Pages/ChatPage';
import ContactsPage from './Pages/ContactsPage';
import LoginPage from './Pages/LoginPage';
import PrivateChatPage from './Pages/PrivateChatPage';
import RegisterPage from './Pages/RegisterPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/" element={<RegisterPage/>} />
        <Route path="/chat" element={<ChatPage/>} />
        <Route path="/chat/:username/:id" element={<PrivateChatPage/>} />
        <Route path="/contacts" element={<ContactsPage/>} />
        <Route path="/add" element={<AddContactPage/>} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
