import React from 'react';
import {
  db,
  auth,
  signInWithPopup,
  serverTimestamp,
  getDoc,
  setDoc,
  doc,
  googleProvider,
} from 'firebase.config';
import AppIcon from './AppIcon';
import defaultStyles from 'common';
import { toast } from 'react-toastify';
import { getFirebaseErrorMessage } from 'common/helpers';
import { useNavigate } from 'react-router';

const GoogleButton = () => {
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userDoc = doc(db, 'users', user.uid);
      const userRef = await getDoc(userDoc);

      if (!userRef.exists()) {
        await setDoc(userDoc, {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          timestamp: serverTimestamp(),
        });
        return toast.success(`User signed-up successfully!`);
      }
      toast.success(`${user.displayName} logged in successfully!`);
      navigate('/home');
    } catch (error) {
      console.log('😱 Error Google Auth: ', error);
      return toast.error('😱 Error: ' + getFirebaseErrorMessage(error.message));
    }
  };

  return (
    <div className='mt-4'>
      <button
        type='button'
        onClick={handleSubmit}
        className='flex justify-center items-center flex-1 bg-red-700 px-4 py-2 text-lg text-center text-white rounded w-full shadow-md font-medium uppercase  hover:bg-red-800 transition duration-1000 ease-in-out hover:shadow-lg active:bg-red-900'
      >
        <AppIcon
          Icon={defaultStyles.icons.google}
          className='text-2xl bg-white rounded-full mr-2'
        />
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleButton;
