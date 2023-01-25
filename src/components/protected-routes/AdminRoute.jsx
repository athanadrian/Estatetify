import { Outlet } from 'react-router';

import { SignIn } from 'pages';
import Loader from '../Loader';
import { useAuthContext, useProfileContext } from 'store/contexts';

const AdminRoute = () => {
  const { loggedIn, isLoading } = useAuthContext();
  const { myProfile } = useProfileContext();

  if (isLoading) return <Loader />;
  return (
    <>{loggedIn && myProfile?.role === 'admin' ? <Outlet /> : <SignIn />}</>
  );
};

export default AdminRoute;
