import { Route, Routes, Outlet, useParams } from 'react-router-dom';
import './App.css';
import Regist from './regist/Regist';
import NotFound from './not_found/NotFound';
import Main from './main/Frame';
import LoginPage from './login/LoginPage';
import TriedList from './tried/TriedList';
import TriedWrite from './tried/TriedWrite';
import TriedDetail from './tried/TriedDetail';
import TriedUpdate from './tried/TriedUpdate.js';
import TriedMain from './tried/TriedMain';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/regist" element={<Regist/>} />
        <Route path="/*" element={<NotFound/>} />
        <Route path="/tried/*" element={<Outlet />} />
        <Route path="/tried" element={<TriedMain />} />
        <Route path="/tried/write" element={<TriedWrite/>} />
        <Route path="/tried/detail/:triedIdx" element={<TriedDetail/>} />
        <Route path="/tried/update/:triedIdx" element={<TriedUpdate/>} />
        <Route path="/tried/:triedCategoryIdx" element={<TriedList />} />
      </Routes>
    </>
  );
}

export default App;
