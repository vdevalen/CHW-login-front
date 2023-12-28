import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import Home from './Home';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
