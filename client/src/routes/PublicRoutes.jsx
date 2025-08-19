import { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { AuthContext } from '../context/AuthContextProvider'
import { useEffect } from 'react';

export const PublicRoutes = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user){
      if (user.type === 1) navigate('/admin');
      if(user.type === 2) navigate('/user');
    }
  }, [user]);

  return (
    <>
      {!user && !loading && <Outlet />} 
    </>
  )
}
