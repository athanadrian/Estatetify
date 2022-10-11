import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ListingProvider } from 'store/contexts/listingsContext';
import { ProfileProvider } from 'store/contexts/profileContext';
import { AuthProvider } from 'store/contexts/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <ListingProvider>
          <App />
        </ListingProvider>
      </ProfileProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
