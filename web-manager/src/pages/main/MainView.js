// import logo from '../../logo.svg';
import '../../App.css';
import { Link } from "react-router-dom";
import Header from "../../components/common/Header"
// import { Button, Col, Row, } from 'react-bootstrap';


function MainView() {
    return (
      <>
      {/* <Row className="mx-0">
        <Button as={Col} variant="primary">Button #1</Button>
        <Button as={Col} variant="secondary" className="mx-2">Button #2</Button>
        <Button as={Col} variant="success">Button #3</Button>
      </Row> */}
      <Header/>
      <div className="container">
        <div className="row my-4">
        <div className="col-md-3 card">dd1</div>
        <div className="col-md-9 card">dd2</div>
        </div>
      </div>
      </>
    );
  }
  
  export default MainView;
  