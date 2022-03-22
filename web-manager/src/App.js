import {
  Routes,
  Route,
} from "react-router-dom";
import IndexView from './pages/main/IndexView'
import MainView from './pages/main/MainView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexView/>} />
      <Route path="main" element={<MainView />} />
    </Routes>
  );
}

export default App;