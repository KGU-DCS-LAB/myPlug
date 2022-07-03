import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from "../../components/common/LoadingSpinner";

function UpdateKecoRawAllView() {

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('no msg');

  useEffect(() => {
    (async () => {
      //ip는 proxy에서 관리해주고 있음
      axios.get('/stationsRouter/update/keco/raw/charger_info/false')
        .then((response) => {
          console.log(response.data.status);
          setMessage(response.data.status);
          setLoading(false);
        }).catch(function (error) {
          console.log("error : ", error);
        });
    })();
  }, []);

  if (loading) return <LoadingSpinner />;
  return (
    <>
      <h1>수집한 원본 데이터 중 한번도 검사하지 않은 "KECO 전기자동차 충전소 정보" RAW 데이터 업데이트 하기</h1>
      <main>
        <div>처리 결과 : {message}</div>
        <div><a href="/">메인으로 돌아가기</a></div>
      </main>
    </>
  )
}
export default UpdateKecoRawAllView;