import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import ImhLogin from "../src/img/Form 1.png";

function LoginForm() {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(true);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Username || !Password) {
      mostrarError('Por favor, completa ambos campos.');
      return;
    }

    if (!isValidEmail(Username)) {
      mostrarError('Por favor, ingresa un nombre de usuario válido (email).');
      return;
    }

    try {
      const basicAuthString = btoa(`${Username}:${Password}`);
      await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${basicAuthString}`,
        },
      })
      .then(response => response.json())
      .then(json => validateToken(json.message.token));
    } catch (error) {
      console.error('Error al hacer la solicitud CHW:', error);
      mostrarError('Error de conexión CHW');
    }
  };

  const validateToken = async (token) => {
    try {
      await fetch('http://localhost:3000/hello-world', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }).then(response => response.json())
      setShowLoginForm(false); 
      navigate('/Home');
    } catch (error) {
      console.error('Error al hacer la solicitud de validación de token:', error);
      // setTokenValidationResult({ success: false, message: 'Error de conexión en la validación de token CHW' });
    }
  };

  const mostrarError = (mensaje = 'Credenciales incorrectas en el CHW') => {
    setError(mensaje);
    setTimeout(() => {
      setError('');
    }, 9000);
  };

  const isValidEmail = (email) => {
    return email.includes('@');
  };

  return (
    <div>
      {showLoginForm ? (
        <div className={`popup-container ${showLoginForm ? 'active' : ''}`}>
          <div className="login-content">
            <div className='InputsContainer'>
              <div>
                <h3 className='titleLogin'>LOGIN</h3>
              </div>
              <h3 className='titleLogion'>Enter your email and password below to sign in.</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className='usernameText' htmlFor="username">
                    Username
                  </label>
                  <input
                    placeholder='Type your username'
                    type="text"
                    id="username"
                    name="username"
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="usernameText" htmlFor="password">
                    Password
                  </label>
                  <input
                    placeholder='Type your password'
                    type="password"
                    id="password"
                    name="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="btnn">
                  INICIAR
                </button>
                <div id='imgLoginCond'>
                  <img id='imgLogin' src={ImhLogin} alt="" />
                </div>
              </form>
            </div>
          </div>
          {error && (
            <div className="alert-overlay">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Home />
      )}
    </div>
  );
}

export default LoginForm;
