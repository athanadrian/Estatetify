import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { SignIn } from 'pages';
import Loader from '../Loader';
import { useAuthContext, useProfileContext } from 'store/contexts';

const AdminRoute = () => {
  const { loggedIn, isLoading } = useAuthContext();
  const { getMyProfile, myProfile } = useProfileContext();

  useEffect(() => {
    if (loggedIn) getMyProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  if (isLoading) return <Loader />;
  return (
    <>{loggedIn && myProfile?.role === 'admin' ? <Outlet /> : <SignIn />}</>
  );
};

export default AdminRoute;
