import React, { useEffect } from 'react';
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
import { UserContextProvider } from './contexts/user';

function App() {
  useEffect(() => {
  }, [])
  return (
    <>
      <Router>
        <UserContextProvider>
          <Navbar />
          <Routes>
            <Route path="/ok" element={<Home />} />
            <Route path="/paper" element={<UploadPaperScreen />} />
            <Route path="/" element={<SignUpLoginInScreen />} />
          </Routes>
        </UserContextProvider>
      </Router>

    </>
  );
}

export default App;
