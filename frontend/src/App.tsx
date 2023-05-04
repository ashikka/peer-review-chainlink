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


function App() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  }, []);

  return (
    <>
      <Router>
        <UserContextProvider>
          <Navbar />
          <Routes>
            {loading === false ? (
              <>
                <Route path="/ok" element={<Home />} />
                <Route path="/paper" element={<UploadPaperScreen />} />
                <Route path="/" element={<SignUpLoginInScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
              </>
            ) : <Route path="/" element={<LoadingScreen />} />}

          </Routes>
        </UserContextProvider>
      </Router>

    </>
  );
}

export default App;
