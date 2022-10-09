import { useAuth } from 'hooks/useAuth';
import { SignIn } from 'pages';
import React from 'react';
import { Outlet } from 'react-router';
import Loader from './Loader';

const UserRoute = () => {
  const { loggedIn, isLoading } = useAuth();
  if (isLoading) return <Loader />;
  return <>{loggedIn ? <Outlet /> : <SignIn />}</>;
};

export default UserRoute;
