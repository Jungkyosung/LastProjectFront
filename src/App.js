import { Route, Routes } from 'react-router-dom';
import './App.css';
import Regist from './regist/Regist';
import NotFound from './not_found/NotFound';
import Main from './main/Frame';
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


function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <Routes>
        <Route path="/" Component={Main} />
        <Route path="/login" Component={LoginPage} exact={true} />
        {/* <Route path="/login" Component={(props) => <LoginPage {...props} setIsLogin={setIsLogin} />} exact={true} /> */}
        <Route path="/regist" Component={Regist} exact={true} />
        <Route path="/*" Component={NotFound} />
        <Route path="/koreanews" Component={KoreaNews} exact={true} />
        <Route path="/koreaissue" Component={KoreaIssue} exact={true} />
        <Route path="/koreaissue/:index" Component={KoreaIssueDetail} exact={true} />
        <Route path="/noticeList" Component={Notice} exact={true} />
        <Route path="/notice/:noticeIdx" Component={NoticeDetail} exact={true} />
        <Route path="/notice/write" Component={NoticeWrite} exact={true} />
        <Route path="/notice/update/:noticeIdx" Component={NoticeUpdate} exact={true} />
        <Route path="/qnalist" Component={QnaList} exact={true} />
        <Route path="/qna/:qnaIdx" Component={QnaDetail} exact={true} />
        <Route path="/qna/write" Component={QnaWrite} exact={true} />
        <Route path="/qna/Update/:qnaIdx" Component={QnaUpdate} exact={true} />
      </Routes>
    </>
  );
}

export default App;
