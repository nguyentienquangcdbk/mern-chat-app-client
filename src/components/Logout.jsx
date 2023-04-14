import axios from 'axios';
import React from 'react';
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth_context';
import { logoutRoute } from '../utils/APIRoutes';
function Logout(props) {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const handleClick = async () => {
      
      const data = await axios.get(`${logoutRoute}/${user._id}`);
      if (data.status === 200) {
        localStorage.clear();
        setUser({})
        navigate("/login");
      }
    };
    return (
        <div className='text-white text-4xl cursor-pointer'  onClick={handleClick}>
  <BiPowerOff />
        </div>
    );
}

export default Logout;