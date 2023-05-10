import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Navbar from './components/Navbar';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import UploadPaperScreen from './pages/UploadPaperScreen/UploadPaperScreen';
import SignUpLoginInScreen from './pages/SignUpLoginInScreen/SignUpLoginInScreen';
import LoadingScreen from './pages/LoadingScreen/LoadingScreen';
import { UserContextProvider } from './contexts/user';
import ProfileScreen from './pages/ProfileScreen/ProfileScreen';
import ReviewPaper from './pages/ReviewPaper/ReviewPaper';
import PageNotFoundScreen from './pages/PageNotFoundScreen/PageNotFoundScreen';


function App() {

  return (
    <>
      <Router>
        <UserContextProvider>
          <Navbar />
          <Routes>
            <>
              <Route path="/ok" element={<Home />} />
              <Route path="/paper" element={<UploadPaperScreen />} />
              <Route path="/" element={<SignUpLoginInScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/review" element={<ReviewPaper />} />
              <Route path="*" element={<PageNotFoundScreen />} />
            </>
          </Routes>
        </UserContextProvider>
      </Router>

    </>
  );
}

export default App;
