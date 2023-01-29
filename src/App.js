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
  OwnerRoute,
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
  UserProfile,
  LandingPage,
  Favorites,
  SearchResults,
  NotFound,
  SubscriptionPlan,
  CheckoutDetails,
  Checkout,
  CheckoutSuccess,
  SubscriptionPlans,
  AdminDashboard,
  AdminSubscriptionsDetails,
  AdminUsers,
  AdminSubscriptions,
  AgentDashboard,
  AgentManage,
  RealEstaterDashboard,
  RealEstaterManage,
  DashboardSubscriptionDetails,
  DashboardSubscriptions,
  DashboardListings,
  DashboardAddListing,
  DashboardEditListing,
} from './pages';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/owner-profile/:ownerId' element={<UserProfile />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/subscriptions/plans' element={<SubscriptionPlans />} />
          <Route path='/subscriptions/:plan' element={<SubscriptionPlan />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/search-results' element={<SearchResults />} />
          <Route path='/listings/:type' element={<Listings />} />
          <Route path='/listings/:type/:listingId' element={<Listing />} />
          <Route element={<SubscribedRoute />}>
            <Route path='/listings/add' element={<AddListing />} />
            <Route path='/listings/edit/:listingId' element={<EditListing />} />
          </Route>
          <Route element={<LoggedInRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/checkout-details' element={<CheckoutDetails />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/checkout-success' element={<CheckoutSuccess />} />
          </Route>
          <Route element={<OwnerRoute />}>
            <Route
              path='/owner/subscriptions'
              element={<DashboardSubscriptions />}
            />
            <Route
              path='/owner/subscriptions/:subscriptionId'
              element={<DashboardSubscriptionDetails />}
            />
          </Route>
          <Route element={<RealEstaterRoute />}>
            <Route
              path='/real-estater/dashboard'
              element={<RealEstaterDashboard />}
            />
            <Route
              path='/real-estater/listings'
              element={<DashboardListings />}
            />
            <Route
              path='/real-estater/listings/add'
              element={<DashboardAddListing />}
            />
            <Route
              path='/real-estater/listings/edit/:listingId'
              element={<DashboardEditListing />}
            />
            <Route
              path='/real-estater/manage'
              element={<RealEstaterManage />}
            />
            <Route
              path='/real-estater/subscriptions'
              element={<DashboardSubscriptions />}
            />
            <Route
              path='/real-estater/subscriptions/:subscriptionId'
              element={<DashboardSubscriptionDetails />}
            />
          </Route>
          <Route element={<AgentRoute />}>
            <Route path='/agent/dashboard' element={<AgentDashboard />} />
            <Route path='/agent/listings' element={<DashboardListings />} />
            <Route
              path='/agent/listings/add'
              element={<DashboardAddListing />}
            />
            <Route
              path='/agent/listings/edit/:listingId'
              element={<DashboardEditListing />}
            />
            <Route path='/agent/manage' element={<AgentManage />} />
            <Route
              path='/agent/subscriptions'
              element={<DashboardSubscriptions />}
            />
            <Route
              path='/agent/subscriptions/:subscriptionId'
              element={<DashboardSubscriptionDetails />}
            />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/users' element={<AdminUsers />} />
            <Route
              path='/admin/subscriptions'
              element={<AdminSubscriptions />}
            />
            <Route
              path='/admin/subscriptions/:subscriptionId'
              element={<AdminSubscriptionsDetails />}
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
