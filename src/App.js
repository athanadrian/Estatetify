import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  Navbar,
  Footer,
  SubscribedRoute,
  AdminRoute,
  RealEstaterRoute,
  LoggedInRoute,
} from './components';
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
  NotFound,
  AdminDashboard,
  RealEstaterDashboard,
  RealEstaterListings,
  RealEstaterAddListing,
  RealEstaterEditListing,
  RealEstaterManage,
  RealEstaterSubscriptions,
  Subscription,
  Checkout,
} from './pages';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route element={<SubscribedRoute />}>
            <Route path='/listings/add' element={<AddListing />} />
            <Route path='/listings/edit/:listingId' element={<EditListing />} />
          </Route>
          <Route element={<LoggedInRoute />}>
            <Route path='/checkout' element={<Checkout />} />
          </Route>
          <Route element={<RealEstaterRoute />}>
            <Route
              path='/real-estater/dashboard'
              element={<RealEstaterDashboard />}
            />
            <Route
              path='/real-estater/listings'
              element={<RealEstaterListings />}
            />
            <Route
              path='/real-estater/add-listing'
              element={<RealEstaterAddListing />}
            />
            <Route
              path='/real-estater/edit-listing/:listingId'
              element={<RealEstaterEditListing />}
            />
            <Route
              path='/real-estater/manage'
              element={<RealEstaterManage />}
            />
            <Route
              path='/real-estater/subscriptions'
              element={<RealEstaterSubscriptions />}
            />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
          </Route>
          <Route path='/owner-profile/:ownerId' element={<OwnerProfile />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/subscription/:plan' element={<Subscription />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/search-results' element={<SearchResults />} />
          <Route path='/listings/:type' element={<Listings />} />
          <Route path='/listings/:type/:listingId' element={<Listing />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
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
