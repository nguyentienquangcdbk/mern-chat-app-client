import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';
import { useAuth } from '../context/auth_context';
function Login(props) {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
    const [values, setValues] = useState({
        username: "",
        password: "",
      });

      
      
    const handleSubmit = async (e) =>{
        e.preventDefault();
        // handleValidation()
        if(handleValidation()){
          
            const { username,password} = values;
            const {data} = await axios.post(loginRoute,{
              username,
              password
            })
            if (data.status === false) {
              toast.error(data.msg);
            }
            if (data.status === true) {
              localStorage.setItem(
                'chat-app-user',
                JSON.stringify(data.user)
              );
              setUser(data.user)
              navigate("/");
            }
            console.log(data);
        }
    }
    const handleValidation = () =>{
        const { username,password} = values;
            
        if (username.length < 3) {
            toast.error(
              "Username should be greater than 3 characters."
              
            );
            return false;
          } else if (password.length < 8) {
            toast.error(
              "Password should be equal or greater than 8 characters."
            );
            return false;
          } 
          return true;
    }
    useEffect(() => {
        if(Object.keys(user).length != 0){
            navigate('/')
        }
      }, [])
    const handleChange = (e) =>{
        setValues({...values,[e.target.name] : e.target.value})
    }
    return (
        <>
        <div className='bg-[#131324] w-full h-screen flex justify-center items-center'>
            <form className='bg-[#00000076] flex flex-col gap-y-5 px-20 py-12 rounded-lg' onSubmit={(e) => handleSubmit(e)}>
                    <div className="bard">
                        
                        <h1 className='text-[#4e0eff] text-2xl font-bold text-center py-2'>snappy</h1>
                    </div>

                    <input className='p-3 border border-[#4e0eff] rounded-lg w-full text-white bg-transparent focus:border-[#997af0] focus:outline-none' type="text" placeholder='Username' onChange={(e) =>handleChange(e)} name="username"  />

                    <input className='p-3 border border-[#4e0eff] rounded-lg w-full text-white bg-transparent focus:border-[#997af0] focus:outline-none' type="password" placeholder='Password' onChange={(e) =>handleChange(e)} name="password"  />


                    <button type='submit' className='text-white bg-[#4e0eff] px-8 rounded-lg border-none  py-4'>Create user</button>

                    <span className='text-white'>already have an account ? <Link className='text-[#4e0eff]' to='/register'>register</Link></span>
            </form>
        </div>
        Login
        </>
    );
}

export default Login;