import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import './authstyle.css';

const AuthPage = () => {
  const [type, setType] = useState('signIn');

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass = `container ${type === 'signUp' ? 'right-panel-active' : ''}`;

  return (
    <div className="AuthPage">
      <h2>Sign in/up Form</h2>
      <div className={containerClass} id="container">
        <Signin />
        <Signup />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" type="button" onClick={() => handleOnClick('signIn')}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" type="button" onClick={() => handleOnClick('signUp')}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
