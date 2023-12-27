import React from 'react';
import LoginForm from './LoginForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='main'>
        <div className='generalContent'>
          <div className='loginCont'>
            <LoginForm />
          </div>  
        </div>
      </div>
    </div>
  );
}

export default App;
