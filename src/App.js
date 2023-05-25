import { Route, Routes } from 'react-router-dom';
import './App.css';
import Regist from './regist/Regist';
import NotFound from './not_found/NotFound';
import Main from './main/Frame';
import LoginPage from './login/LoginPage';
import MapList from './course/MapList';
import Game2 from "./worldcup/Game2";
import Game1 from "./worldcup/Game1";
import Game3 from "./worldcup/Game3";
import { createGlobalStyle } from 'styled-components';
import Winpage from "./worldcup/Winpage";

const GlobalStyle = createGlobalStyle`
* { 
  margin:0;
  paddinf: 0;
  box-sizing:border-box;
}
`;

function App() {
  return (
    <>
    <GlobalStyle></GlobalStyle>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/login" element={<Main/>} />
        <Route path="/regist" element={<Main/>} />
        <Route path="/*" element={<Main/>} />
        <Route path="/course" element={<MapList/>}/>
        <Route path="/1" element={<Game1 />} />
        <Route path="/2" element={<Game2 />} />
        <Route path="/3" element={<Game3 />} />
        <Route path="/winpage/:rawinfoIdx/:triedCategoryIdx" element={<Winpage/>} />
      </Routes>
    </>
  );
}

export default App;
