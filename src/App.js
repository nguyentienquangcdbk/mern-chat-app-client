import React, { useEffect } from 'react';
import {Routes,Route, useNavigate} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/auth_context';
import Chats from './pages/Chats';
import Login from './pages/Login';
import Register from './pages/Register';
import SetAvatar from './pages/SetAvatar';

function App(props) {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
      useEffect(() =>{
            if(Object.keys(user).length === 0){
                const getUser = JSON.parse(localStorage.getItem('chat-app-user'));
                if(getUser){

                  setUser(getUser);
                }else{
                    navigate('/login')
                }
            }
      },[])
  return (
    

    <div>
    <ToastContainer autoClose={5000} draggable={true} theme="dark" pauseOnHover={true} position="bottom-right"></ToastContainer>
      <Routes>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/setAvatar' element={<SetAvatar></SetAvatar>}></Route>
        <Route path='/' element={<Chats></Chats>}></Route>
      </Routes>
    </div>

  );
}

export default App;