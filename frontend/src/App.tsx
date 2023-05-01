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
import Login from './pages/Paper';

function App() {
  useEffect(() => {
  }, [])
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/paper" element={<Login />} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
