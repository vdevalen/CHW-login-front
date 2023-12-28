import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import HolaMundo from './HolaMundo';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/HolaMundo" element={<HolaMundo />} />
      </Routes>
    </Router>
  );
}

export default App;
