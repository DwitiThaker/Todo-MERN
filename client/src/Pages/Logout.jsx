import React, { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Store/Auth';

export const Logout = () => {

    const {LogoutUser} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        LogoutUser();
        navigate("/login");
    }, [LogoutUser, navigate])

  return (
    <div>
    </div>
  )
}


