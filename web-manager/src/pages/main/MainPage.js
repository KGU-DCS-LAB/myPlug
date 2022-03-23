import React, { useState, useEffect } from 'react';
import '../../App.css';
import Header from "../../components/common/Header";
import LoadingView from "../../views/main/LoadingView";
import MainView from "../../views/main/MainView";
import axios from 'axios';
import Table from "../../components/Table";

// import { Button, Col, Row, } from 'react-bootstrap';

function MainPage() {

  const [loading, setLoading] = useState(true);
  const [charging_stations, setChargingStation] = useState([]);

  useEffect(() => {
    (async () => {
      // 충전소 데이터 받아오는 작업 시작
      //ip는 변경되어야 할 가능성이 높으니깐 주의 바람 (윤주현)
      axios.get('/stationsRouter/find')
      .then((response) => {
        setChargingStation(response.data);
        // setChargingStation(JSON.stringify(response.data));
        console.log(JSON.stringify(response.data))
        setLoading(false);
      }).catch(function (error) {
        setChargingStation('serverError');
        console.log(error);
      });
     // 충전소 데이터 받아오는 작업 끝
    })();
  }, []);

  if (loading) return <LoadingView/>;
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
  