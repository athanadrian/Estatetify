import { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from 'firebase.config';

export const useAuth = () => {
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const logOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setUser(user);
      }
      setLoading(false);
    });
  }, []);
  return { user, loggedIn, isLoading, logOut };
};
