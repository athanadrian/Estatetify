import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header, UserRoute } from './components';
import {
  Profile,
  Home,
  Offers,
  SignIn,
  SignUp,
  ForgotPassword,
  AddListing,
  EditListing,
  Listings,
  Listing,
  OwnerProfile,
  LandingPage,
  Favorites,
  SearchResults,
} from './pages';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
          <Route element={<UserRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/listings/add' element={<AddListing />} />
            <Route path='/listings/edit/:listingId' element={<EditListing />} />
          </Route>
          <Route path='/owner-profile/:ownerId' element={<OwnerProfile />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/search-results' element={<SearchResults />} />
          <Route path='/listings/:type' element={<Listings />} />
          <Route path='/listings/:type/:listingId' element={<Listing />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </Router>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </>
  );
};

export default App;
