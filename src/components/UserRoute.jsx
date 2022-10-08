import { useAuth } from 'hooks/useAuth';
import { SignIn } from 'pages';
import React from 'react';
import { Outlet } from 'react-router';

const UserRoute = () => {
  const { loggedIn, isLoading } = useAuth();
  if (isLoading)
    return <h1 className='text-3xl text-red-500 font-bold'>loading....</h1>;
  return <>{loggedIn ? <Outlet /> : <SignIn />}</>;
};

export default UserRoute;
