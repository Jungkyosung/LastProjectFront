import { Route, Routes } from 'react-router-dom';
import './App.css';
import Regist from './regist/Regist';
import NotFound from './not_found/NotFound';
import Main from './main/Frame';
import LoginPage from './login/LoginPage';
import { useState } from "react";
import KoreaNews from './koreanews/KoreaNews';
import KoreaIssue from './koreanews/KoreaIssue';
import KoreaIssuescroll from './koreanews/KoreaIssuescroll';
import KoreaIssueDetail from './koreanews/KoreaIssueDetail';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <Routes>
        <Route path="/" Component={Main} />
        {/* <Route path="/login" Component={LoginPage} exact={true} /> */}
        <Route path="/login" Component={(props) => <LoginPage {...props} setIsLogin={setIsLogin} />}exact={true} />
        <Route path="/regist" Component={Regist} exact={true}/>
        <Route path="/*" Component={NotFound}/>
        <Route path="/koreanews" Component={KoreaNews} exact={true}/>
        <Route path="/koreaissue" Component={KoreaIssue} exact={true}/>
        <Route path="/koreaissue/detail/:index" Component={KoreaIssueDetail} exact={true} />
        <Route path="/koreaissuescroll" Component={KoreaIssuescroll} exact={true}/>
      </Routes>
    </>
  );
}

export default App;
