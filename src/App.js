// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import Home from './Home';
import { AuthProvider, useAuth } from './AuthContext';
import './App.css';

function PrivateRoute({ element }) {
  const auth = useAuth();

  console.log('isLoggedIn:', auth.isLoggedIn); // Añade este log para depurar

  return auth.isLoggedIn ? element : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/Home" element={<PrivateRoute element={<Home />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
