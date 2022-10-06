import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Profile, Home, Offers, SignIn, SignUp, ForgotPassword } from './pages';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
