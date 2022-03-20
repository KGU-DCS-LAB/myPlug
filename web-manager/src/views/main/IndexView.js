import logo from '../../logo.svg';
import '../../App.css';

function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

const IndexView = (props) => {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button
            // className="App-link"
            onClick={()=>console.log('dd')}
          >
            Learn React
          </button>
          <a href="#" onClick={handleClick}>
            Click me
          </a>
        </header>
      </div>
    );
  }
  
  export default IndexView;
  