import { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from 'firebase.config';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);

  const logOut = async () => {
    await auth.signOut();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setUser(user);
      } else {
        setUser(undefined);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setAuthenticated(true);
      else setAuthenticated(false);
    });
  }, []);

  return { user, loggedIn, isAuthenticated, isLoading, logOut };
};
