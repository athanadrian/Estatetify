import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { SignIn } from 'pages';
import Loader from '../Loader';
import { useAuth } from 'hooks/useAuth';
import { useProfileContext } from 'store/contexts';

const RealEstaterRoute = () => {
  const { loggedIn, isLoading, user } = useAuth();
  const { getProfileUser, profileUser } = useProfileContext();

  useEffect(() => {
    if (loggedIn) getProfileUser(user.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loggedIn]);

  if (isLoading) return <Loader />;
  return (
    <>
      {loggedIn && profileUser?.role === 'real-estater' ? (
        <Outlet />
      ) : (
        <SignIn />
      )}
    </>
  );
};

export default RealEstaterRoute;
