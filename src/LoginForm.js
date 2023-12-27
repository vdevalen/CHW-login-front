import React, { useState } from 'react';

function LoginForm({ onClosePopup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('URL_DEL_BACKEND/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        // Guarda el token en el estado, contexto o donde lo necesites
        // Ejemplo: setToken(token);
      window.location.href = 'https://www.chwlearninghub.org/blog/';
      } else {
        setError('Credenciales incorrectas en el CHW');
      }
    } catch (error) {
      console.error('Error al hacer la solicitud CHW:', error);
      setError('Error de conexión CHW');
    }
  };

  const [showPopup] = useState(true);
  return (
    <div>
      <div className={`background-overlay ${showPopup ? 'active' : ''}`} onClick={onClosePopup}></div>
      <div className={`popup-container ${showPopup ? 'active' : ''}`}>
        <div className="login-content">
          <div className='InputsContainer'>
            <h3 className='titleLoguin'>LOGIN CHW</h3>
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
                  value={username}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <a className='RememberMeText' href="#">Remember me</a>
              <button className="btnn" type="submit">
                INICIAR
              </button>
            </form>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
