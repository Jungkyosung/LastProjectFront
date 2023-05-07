import { Route, Routes } from 'react-router-dom';
import './App.css';
import Regist from './regist/Regist';
import NotFound from './not_found/NotFound';
import LoginPage from './login/LoginPage';
import RegistGoogle from './regist/RegistGoogle';
import Parent from './chat/ChatParent';
import Notice from './notice/Notice';
import Tried from './tried/Tried';
import Accompany from './accompany/Accompany';
import Weather from './weather/Weather';
import Webcartoon from './webcartoon/Webcartoon';
import Admin from './admin/Admin';
import Mypage from './mypage/Mypage';
import MapList from './course/MapLIst';
import MapWrite from './course/MapWrite';
import MapDetail from './course/MapDetail';
import KoreaNews from './koreanews/KoreaNews';
import KoreaIssue from './koreanews/KoreaIssue';
import NoticeDetail from './notice/NoticeDetail';
import NoticeWrite from './notice/NoticeWrite';
import NoticeUpdate from './notice/NoticeUpdate';
import KoreaIssueDetail from './koreanews/KoreaIssueDetail';
import MainPage from './main/MainPage';
import MobileMypage from './mypage/MobileMypage';
import MobileChatPage from './chat/MobileChatPage';


function App() {
  return (
    <>
      <Routes>
        <Route path="/"                               element={<MainPage/>}        />
        <Route path="/login"                          element={<LoginPage/>}       />
        <Route path="/regist"                         element={<Regist/>}          />
        <Route path="/regist/social/google"           element={<RegistGoogle/>}    />
        <Route path="/notice/:noticeIdx"              element={<NoticeDetail/>}    />
        <Route path="/notice/write"                   element={<NoticeWrite/>}     />
        <Route path="/noticeList"                     element={<Notice/>}          />
        <Route path="/notice/update/:noticeIdx"       element={<NoticeUpdate/>}    />
        <Route path="/chat"                           element={<Parent/>}          />
        <Route path="/mobilechat"                     element={<MobileChatPage/>}  />
        <Route path="/weather"                        element={<Weather/>}         />
        <Route path="/koreanews"                      element={<KoreaNews/>}       />
        <Route path="/koreaissue"                     element={<KoreaIssue/>}      />
        <Route path="/koreaissue/:index"              element={<KoreaIssueDetail/>}/>
        <Route path="/webcartoon"                     element={<Webcartoon/>}      />
        <Route path="/tried"                          element={<Tried/>}           />
        <Route path="/accompany"                      element={<Accompany/>}       />
        <Route path="/adminpage"                      element={<Admin/>}           />
        <Route path="/mypage"                         element={<Mypage/>}          />
        <Route path="/mobilemypage"                   element={<MobileMypage/>}    />
        <Route path="/course"                         element={<MapList />}        />
        <Route path="/course/mapwrite"                element={<MapWrite />}       />
        <Route path="/course/detail/:travelcourseIdx" element={<MapDetail />}      />
        <Route path="/*"                              element={<NotFound/>}        />
      </Routes>
    </>
  );
}

export default App;
