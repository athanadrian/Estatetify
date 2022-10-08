import UserRoute from 'components/UserRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header } from './components';
import { Profile, Home, Offers, SignIn, SignUp, ForgotPassword } from './pages';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route to='profile' element={<UserRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/offers' element={<Offers />} />
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
