import { Route, Routes, Outlet } from 'react-router-dom';
import './App.css';
import Regist from './regist/Regist';
import NotFound from './not_found/NotFound';
import Main from './main/Frame';
import LoginPage from './login/LoginPage';
import TriedList from './tried/TriedList';
import TriedWrite from './tried/TriedWrite';
import TriedDetail from './tried/TriedDetail';
import TriedUpdate from './tried/TriedUpdate.js';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/regist" element={<Regist/>} />
        <Route path="/*" element={<NotFound/>} />
        <Route path="/tried" element={<TriedList/>} />
        <Route path="/tried/write" element={<TriedWrite/>} />
        <Route path="/tried/detail/:triedIdx" element={<TriedDetail/>} />
        <Route path="/tried/detail/:triedIdx/update" element={<TriedUpdate/>} />
        <Route path="/tried/*" element={<Outlet />} />
      </Routes>
    </>
  );
}

export default App;
