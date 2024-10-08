import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';

const App = () => {
  return (
    
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={< Home />}></Route>
        <Route path="/about" element={< About />}></Route>
        <Route path="/sign-in" element={< SignIn />}></Route>
        <Route path="/sign-up" element={< SignUp />}></Route>
        <Route path="/search" element={< Search />}></Route>
        <Route path="/listing/:listingId" element={< Listing />}></Route>
        <Route element={< PrivateRoute />}>
          <Route path="/create-listing" element={< CreateListing />}></Route>
          <Route path="/update-listing/:listingId" element={< UpdateListing />}></Route>
          <Route path="/profile" element={< Profile />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App