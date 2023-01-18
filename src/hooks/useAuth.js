import { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from 'firebase.config';

//TODO
//DELETE This Hook
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
        setLoggedIn(false);
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

  return { user, setUser, loggedIn, isAuthenticated, isLoading, logOut };
};
