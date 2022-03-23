import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';

const LoadingView = (props) => {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Loading...
          </p>
        </header>
      </div>
    );
  }
  
  export default LoadingView;
  