import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import { useAuth } from './AuthContext';
import ImhLogin from "../src/img/Form 1.png";

function LoginForm({ onClosePopup }) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); 
  const [token, setToken] = useState(null);
  const [tokenValidationesult, setTokenValidationResult] = useState(false); 
  const [showLoginForm, setShowLoginForm] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      validateToken(token);
    }
  // eslint-disable-next-line 
  }, [token]);

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
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${basicAuthString}`,
        },
        body: JSON.stringify({ Username, Password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        login();
        setToken(token);
      } else {
        mostrarError();
      }
    } catch (error) {
      console.error('Error al hacer la solicitud CHW:', error);
      mostrarError('Error de conexión CHW');
    }
  };

  const validateToken = async (token) => {
    try {
      const response = await fetch('http://localhost:3000/validate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'System': 'Security',
          'Module': 'Authenticate',
          'Controller': 'Authenticate',
          'Action': 'Validate',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setTokenValidationResult(result);

        if (result) {
          setShowLoginForm(false); 
          navigate('/Home');
        }
      } else {
        setShowLoginForm(false);
        console.error('Error al validar el token:', response.statusText);
        setTokenValidationResult({ success: false, message: 'Token validation failed' });
      }
    } catch (error) {
      console.error('Error al hacer la solicitud de validación de token:', error);
      setTokenValidationResult({ success: false, message: 'Error de conexión en la validación de token CHW' });
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
