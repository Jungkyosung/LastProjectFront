import { Route, Routes } from 'react-router-dom';
import './App.css';
import Regist from './regist/Regist';
import NotFound from './not_found/NotFound';
import Frame from './main/Frame';
import LoginPage from './login/LoginPage';
import RegistGoogle from './regist/RegistGoogle';
import Parent from './chat/Parent';
import Notice from './notice/Notice';
import Tried from './tried/Tried';
import Accompany from './accompany/Accompany';
import Weather from './weather/Weather';
import News from './news/News';
import Webcartoon from './webcartoon/Webcartoon';
import Admin from './admin/Admin';
import Mypage from './mypage/Mypage';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Frame/>} exact={true} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/regist" element={<Regist/>} />
        <Route path="/regist/social/google" element={<RegistGoogle/>} />
        <Route path="/notice" element={<Notice/>} />
        <Route path="/chat" element={<Parent/>}/>
        <Route path="/weather" element={<Weather/>} />
        <Route path="/news" element={<News/>} />
        <Route path="/webcartoon" element={<Webcartoon/>} />
        <Route path="/tried" element={<Tried/>} />
        <Route path="/accompany" element={<Accompany/>} />
        <Route path="/adminpage" element={<Admin/>} />
        <Route path="/mypage" element={<Mypage/>} />
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
