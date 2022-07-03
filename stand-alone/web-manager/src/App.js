import {
  Routes,
  Route,
} from "react-router-dom";
import DefaultLayout from "./components/common/DefaultLayout";
import HomeContainer from "./containers/common/HomeContainer";
import KecoRawDataViewContainer from "./containers/keco/raw_data_view/KecoRawDataViewContainer";
import GetKecoRawAll from "./views/data/GetKecoRawAll";
import UpdateKecoRawAllView from "./views/data/UpdateKecoRawAllView";

function App() {
  return (
    <Routes>
      {/* 이 Layout 안에 갇히게 됨... nested된 Container들은 Layout의 Outlet으로 연결된다 */}
      <Route path="/" element={<DefaultLayout />}>
        {/* DefaultLayout의 Outlet으로 연결되는 부분 시작 */}
        <Route path="/" element={<HomeContainer />} />
        <Route path="data/get_keco_raw_all" element={<GetKecoRawAll/>} />
        {/* 무한 스크롤 구현하다가 중단 */}
        {/* <Route path="data/get_keco_raw_all" element={<KecoRawDataViewContainer/>} /> */}
        <Route path="data/update_keco_raw_all" element={<UpdateKecoRawAllView/>} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>잘못된 요청입니다!</p>
            </main>
          }
        />
        {/* DefaultLayout의 Outlet으로 연결되는 부분 끝 */}
      </Route>
    </Routes>
  );
}

export default App;