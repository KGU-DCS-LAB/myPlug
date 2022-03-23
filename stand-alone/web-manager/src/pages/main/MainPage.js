import React, { useState, useEffect } from 'react';
import '../../App.css';
import Header from "../../components/common/Header";

import MainView from "../../views/main/MainView";


// import { Button, Col, Row, } from 'react-bootstrap';

function MainPage() {

  return (
    <>
    <Header/>
    <div className="container">
      <div className="row my-4">
        <MainView/>
      </div>
      <footer class="pt-5 my-5 text-muted border-top">
        Created by the KGU-DCS-LAB &middot; &copy; 2022
      </footer>
    </div>
    </>
  );
}

export default MainPage;
  