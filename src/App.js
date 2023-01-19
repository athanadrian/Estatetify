import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  Navbar,
  Footer,
  SubscribedRoute,
  AdminRoute,
  RealEstaterRoute,
  LoggedInRoute,
  AgentRoute,
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
  SubscriptionPlan,
  CheckoutDetails,
  Checkout,
  CheckoutSuccess,
  SubscriptionPlans,
  AgentDashboard,
  RealEstaterPurchases,
  AgentPurchases,
  AgentSubscriptions,
  AgentManage,
  AgentEditListing,
  AgentAddListing,
  AgentListings,
  AdminUsers,
  AdminSubscriptions,
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
          <Route path='/owner-profile/:ownerId' element={<OwnerProfile />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/subscription-plans' element={<SubscriptionPlans />} />
          <Route path='/subscription/:plan' element={<SubscriptionPlan />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/search-results' element={<SearchResults />} />
          <Route path='/listings/:type' element={<Listings />} />
          <Route path='/listings/:type/:listingId' element={<Listing />} />
          <Route element={<SubscribedRoute />}>
            <Route path='/listings/add' element={<AddListing />} />
          </Route>
          <Route element={<LoggedInRoute />}>
            <Route path='/listings/edit/:listingId' element={<EditListing />} />
            <Route path='/checkout-details' element={<CheckoutDetails />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/checkout-success' element={<CheckoutSuccess />} />
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
            <Route
              path='/real-estater/purchases'
              element={<RealEstaterPurchases />}
            />
          </Route>
          <Route element={<AgentRoute />}>
            <Route path='/agent/dashboard' element={<AgentDashboard />} />
            <Route path='/agent/listings' element={<AgentListings />} />
            <Route path='/agent/add-listing' element={<AgentAddListing />} />
            <Route
              path='/agent/edit-listing/:listingId'
              element={<AgentEditListing />}
            />
            <Route path='/agent/manage' element={<AgentManage />} />
            <Route
              path='/agent/subscriptions'
              element={<AgentSubscriptions />}
            />
            <Route path='/agent/purchases' element={<AgentPurchases />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/users' element={<AdminUsers />} />
            <Route
              path='/admin/subscriptions'
              element={<AdminSubscriptions />}
            />
          </Route>
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
