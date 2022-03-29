import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingView from "../../views/main/LoadingView";

function UpdateRawAllView() {

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('no msg');

    useEffect(() => {
      (async () => {
        //ip는 proxy에서 관리해주고 있음
        axios.get('/stationsRouter/update/raw/false')
        .then((response) => {
          console.log(response.data.status);
          setMessage(response.data.status);
          setLoading(false);
        }).catch(function (error) {
          console.log("error : ",error);
        });
      })();
    }, []);
  
    if (loading) return <LoadingView/>;
    return(
      <div className="container">
        <h1>수집한 원본 데이터 중 한번도 검사하지 않은 데이터 업데이트 하기</h1>
        <main>
            <div>처리 결과 : {message}</div>
            <div><a href="/main">메인으로 돌아가기</a></div>
        </main>
      </div>
    )
}
export default UpdateRawAllView;