import { Route, Routes } from 'react-router-dom';
import './App.css';
import Regist from './regist/Regist';
import NotFound from './not_found/NotFound';
import Main from './main/Frame';
import LoginPage from './login/LoginPage';
import MapList from './course/MapList';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/login" element={<Main/>} />
        <Route path="/regist" element={<Main/>} />
        <Route path="/*" element={<Main/>} />
        <Route path="/course" element={<MapList/>}/>
      </Routes>
    </>
  );
}

export default App;
