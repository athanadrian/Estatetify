import { Outlet } from 'react-router';

import { SignIn } from 'pages';
import Loader from '../Loader';
import { useAuthContext } from 'store/contexts';

const LoggedInRoute = () => {
  const { loggedIn, isLoading } = useAuthContext();

  if (isLoading) return <Loader />;
  return <>{loggedIn ? <Outlet /> : <SignIn />}</>;
};

export default LoggedInRoute;
