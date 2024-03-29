import { Outlet } from 'react-router';

import { SignIn } from 'pages';
import Loader from '../Loader';
import { useAuthContext, useProfileContext } from 'store/contexts';

const RealEstaterRoute = () => {
  const { loggedIn, isLoading } = useAuthContext();
  const { myProfile } = useProfileContext();

  if (isLoading) return <Loader />;
  return (
    <>
      {loggedIn && myProfile?.role === 'real-estater' ? <Outlet /> : <SignIn />}
    </>
  );
};

export default RealEstaterRoute;
