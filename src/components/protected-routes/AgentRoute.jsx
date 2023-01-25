import { Outlet } from 'react-router';

import { SignIn } from 'pages';
import Loader from '../Loader';
import { useAuthContext, useProfileContext } from 'store/contexts';

const AgentRoute = () => {
  const { loggedIn, isLoading } = useAuthContext();
  const { myProfile } = useProfileContext();

  if (isLoading) return <Loader />;
  return (
    <>{loggedIn && myProfile?.role === 'agent' ? <Outlet /> : <SignIn />}</>
  );
};

export default AgentRoute;
