import { Route, Routes } from 'react-router-dom';
import './App.css';
import Regist from './regist/Regist';
import NotFound from './not_found/NotFound';  
import LoginPage from './login/LoginPage';
import { useState } from "react";
import KoreaNews from './koreanews/KoreaNews';
import KoreaIssue from './koreanews/KoreaIssue';
import KoreaIssueDetail from './koreanews/KoreaIssueDetail';
import Notice from './notice/Notice';
import NoticeWrite from './notice/NoticeWrite';
import NoticeDetail from './notice/NoticeDetail';
import NoticeUpdate from './notice/NoticeUpdate';
import QnaList from './qna/QnaList';
import QnaDetail from './qna/QnaDetail';
import QnaWrite from './qna/QnaWrite';
import QnaUpdate from './qna/QnaUpdate';
import Idealreal from './idealreal/IdealReal';
import IdealrealWrite from './idealreal/IdealrealWrite';
import IdealrealDetail from './idealreal/IdealrealDetail';
import IdealrealRetouch from './idealreal/IdealrealRetouch'
import Accompany from './accompany/Accompany';
import AccompanyDetail from './accompany/AccompanyDetail';
import AccompanyWrite from './accompany/AccompanyWrite';
import AccompanyUpdate from './accompany/AccompanyUpdate';
import MainPage from './main/MainPage';



function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <Routes>
        <Route path="/" Component={MainPage} />
        <Route path="/login" Component={LoginPage} exact={true} />
        {/* <Route path="/login" Component={(props) => <LoginPage {...props} setIsLogin={setIsLogin} />} exact={true} /> */}
        <Route path="/regist" Component={Regist} exact={true} />
        <Route path="/*" Component={NotFound} />
        <Route path="/koreanews" Component={KoreaNews} exact={true} />
        <Route path="/koreaissue" Component={KoreaIssue} exact={true} />
        <Route path="/koreaissue/:index" Component={KoreaIssueDetail} exact={true} />
        <Route path="/noticelist" Component={Notice} exact={true} />
        <Route path="/notice/:noticeIdx" Component={NoticeDetail} exact={true} />
        <Route path="/notice/write" Component={NoticeWrite} exact={true} />
        <Route path="/notice/update/:noticeIdx" Component={NoticeUpdate} exact={true} />
        <Route path="/qnalist" Component={QnaList} exact={true} />
        <Route path="/qna/:qnaIdx" Component={QnaDetail} exact={true} />
        <Route path="/qna/write" Component={QnaWrite} exact={true} />
        <Route path="/qna/Update/:qnaIdx" Component={QnaUpdate} exact={true} />
        <Route path="/idealreal" Component={Idealreal} exact={true} />
        <Route path="/listidealreal/detail/:idealrealIdx" Component={IdealrealDetail} exact={true}/>
        <Route path="/idealreal/write" Component={IdealrealWrite} exact={true} />
        <Route path="/idealrealretouch/:idealrealIdx" Component={IdealrealRetouch} exact={true}/>
        <Route path="/accompany" Component={Accompany} exact={true} />
        <Route path="/accompany/detail/:accompanyIdx" Component={AccompanyDetail} exact={true} />
        <Route path="/accompany/write" Component={AccompanyWrite} exact={true} />
        <Route path="/accompany/update/:accompanyIdx" Component={AccompanyUpdate} exact={true} />
      </Routes>
    </>
  );
}

export default App;
