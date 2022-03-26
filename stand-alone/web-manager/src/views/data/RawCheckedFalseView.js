import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingView from "../../views/main/LoadingView";
import Table from "../../components/Table";


function RawCheckedFalseView() {

    const [loading, setLoading] = useState(true);
    const [charging_stations, setChargingStation] = useState([]);
  
    useEffect(() => {
      (async () => {
        // 충전소 데이터 받아오는 작업 시작
        //ip는 변경되어야 할 가능성이 높으니깐 주의 바람 (윤주현)
        axios.get('/stationsRouter/find/raw/false')
        .then((response) => {
          setChargingStation(response.data);
          // setChargingStation(JSON.stringify(response.data));
          console.log(JSON.stringify(response.data));
          console.log('/stationsRouter/find/raw/false');
          setLoading(false);
        }).catch(function (error) {
          setChargingStation('serverError');
          console.log(error);
        });
       // 충전소 데이터 받아오는 작업 끝
      })();
    }, []);
  
    if (loading) return <LoadingView/>;
    return(
      <div className="container">
        <h1>수집한 전체 원본 데이터 중 checked가 false인 데이터 확인하기</h1>
        <main>
            <Table data={charging_stations} rowsPerPage={30} />
        </main>
      </div>
    )
}
export default RawCheckedFalseView;