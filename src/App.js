import { Route, Routes } from 'react-router-dom';
import './App.css';
import Regist from './regist/Regist';
import NotFound from './not_found/NotFound';
import Main from './main/Frame';
import LoginPage from './login/LoginPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/regist" element={<Regist/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
