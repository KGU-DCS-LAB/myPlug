// import logo from '../../logo.svg';
import React, { useState, useEffect } from 'react';
import '../../App.css';
import Header from "../../components/common/Header"
import axios from 'axios';

// import { Button, Col, Row, } from 'react-bootstrap';

function MainView() {
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

  function ListItem(props) {
    return <li>{props.value}</li>;
  }
  
  function StationList(props) {
    const stations = props.stations;
    return (
      <ul>
        {stations.map((station) =>
          <ListItem key={station._id}
                    value={station.charging_station_name} />
        )}
      </ul>
    );
  }
  if (loading) return <div>Loading...</div>;
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
        <div className="col-md-9 card"><StationList stations={charging_stations} /></div>
      </div>
    </div>
    </>
  );
}

export default MainView;
  