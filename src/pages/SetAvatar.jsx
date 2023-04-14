import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Buffer} from 'buffer';
import { toast } from 'react-toastify';
import {setAvatarRoute} from '../utils/APIRoutes';
import { useAuth } from '../context/auth_context';


const listImg = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
]
function SetAvatar(props) {

  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);


  useEffect( () => {
    if (!localStorage.getItem('chat-app-user')){
      navigate("/login");
    }
  }, []);
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar");
    } else {
      const oneuser = await JSON.parse(
        localStorage.getItem('chat-app-user')
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: listImg[selectedAvatar],
      });
        console.log(data.isSet);
      if (data.isSet) {
        oneuser.isAvatarImageSet = true;
        oneuser.avatarImage = data.image;
        localStorage.setItem(
          'chat-app-user',
          JSON.stringify(oneuser)
        );
        setUser(oneuser)
        console.log('ko chuyen dc a',oneuser);
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.");
      }
    }
  };

  
    return (
        <div className='w-full h-screen flex flex-col gap-y-5 items-center justify-center bg-[#131324]'>
            <div> 
                <h1 className='text-white text-2xl font-semibold'>Pick an avatar as your profile picture</h1>
            </div>
            <div className='flex gap-x-5'>
                {
                    listImg.map((item,index) =>(
<img key={index} src={item} className={`w-28 h-28 rounded-full object-cover ${index === selectedAvatar ? 'border-2 border-violet-700' : ''}`} onClick={() => setSelectedAvatar(index)} alt="" />
                    ))
                }
                
               


            </div>
            <button onClick={setProfilePicture} className="text-white bg-[#4e0eff] px-5 py-3 rounded-lg mt-10">
            Set as Profile Picture
          </button>
        </div>
    );
}

export default SetAvatar;