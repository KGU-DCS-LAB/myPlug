import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';

const LoadingSpinner = (props) => {

  return (
    <>
      <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <div className='text-center'>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Loading...
          </p>
        </div>
      </div>
    </>
  );
}

export default LoadingSpinner;
