import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ListingProvider } from 'store/contexts/listingsContext';
import { ProfileProvider } from 'store/contexts/profileContext';
import { AuthProvider } from 'store/contexts/authContext';
import { CommonProvider } from 'store/contexts/commonContext';
import { SubscriptionProvider } from 'store/contexts/subscriptionsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <ListingProvider>
          <CommonProvider>
            <SubscriptionProvider>
              <App />
            </SubscriptionProvider>
          </CommonProvider>
        </ListingProvider>
      </ProfileProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
