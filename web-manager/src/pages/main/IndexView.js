import logo from '../../logo.svg';
import '../../App.css';
import { Link } from "react-router-dom";

const IndexView = (props) => {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            myPlug : Data Management Systems
          </p>
          <Link
           className="App-link"
           to="/main"
          >
            Start
          </Link>
        </header>
      </div>
    );
  }
  
  export default IndexView;
  