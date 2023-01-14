import React, { useEffect } from 'react';
import { Outlet } from 'react-router';

import { useAuth } from 'hooks/useAuth';
import { SignIn } from 'pages';
import Loader from '../Loader';
import {
  useListingContext,
  useProfileContext,
  useSubscriptionContext,
} from 'store/contexts';

const LoggedInRoute = () => {
  const { loggedIn, isLoading } = useAuth();

  if (isLoading) return <Loader />;
  return <>{loggedIn ? <Outlet /> : <SignIn />}</>;
};

export default LoggedInRoute;
