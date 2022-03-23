import {
  Routes,
  Route,
} from "react-router-dom";
import IndexView from './pages/main/IndexView'
import MainPage from './pages/main/MainPage';
import DataPage from "./pages/data/DataPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexView/>} />
      <Route path="main" element={<MainPage />} />
      <Route path="data/:menu" element={<DataPage/>} />
    </Routes>
  );
}

export default App;