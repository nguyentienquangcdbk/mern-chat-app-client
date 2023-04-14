import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth_context';

function Welcome(props) {
  const { user, setUser } = useAuth();

    return (
        <div className='text-white font-bold text-3xl text-center'>
            xin chao ban {user.username}
        </div>
    );
}

export default Welcome;