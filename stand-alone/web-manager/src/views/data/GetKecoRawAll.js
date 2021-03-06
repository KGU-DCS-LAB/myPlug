import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from "../../components/common/LoadingSpinner";
import KecoTable from "../../components/KecoTable";


function GetKecoRawAll() {

  const [loading, setLoading] = useState(true);
  const [charging_stations, setChargingStation] = useState([]);

  useEffect(() => {
    (async () => {
      // 충전소 데이터 받아오는 작업 시작
      //ip는 proxy에서 관리해주고 있음
      axios.get('/stationsRouter/find/keco/raw/charger_info/all')
        .then((response) => {
          setChargingStation(response.data);
          console.log(JSON.stringify(response.data))
          setLoading(false);
        }).catch(function (error) {
          setChargingStation('serverError');
          console.log(error);
        });
      // 충전소 데이터 받아오는 작업 끝
    })();
  }, []);

  return (
    <>
      {
        loading ?
          <LoadingSpinner />
          :
          <>
            <h1>KECO 서버로부터 수집한 "KECO 전기자동차 충전소 정보" RAW 데이터 확인하기</h1>
            <main>
              <KecoTable data={charging_stations} rowsPerPage={30} />
            </main>
          </>
      }

    </>
  )
}
export default GetKecoRawAll;