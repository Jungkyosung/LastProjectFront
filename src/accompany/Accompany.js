import Frame from '../main/Frame';
import './Accompany.css';
import AccompanyEach from './AccompanyEach';
import Input from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

const ariaLabel = { 'aria-label': 'description' };



const Accompany = () => {

  const navigate = useNavigate();

  const handlerOpenDetail = () => {
    navigate(`/accompany/detail/0`);
  }

  return (
    <Frame>
      <div id="accompany-main-list-img">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg/1280px-Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg" />
      </div>
      <div id="accompany-list-wrap">
        <ul id="accompany-list-area-ul">
          <li>서울</li>
          <li>강원도</li>
          <li>제주도</li>
          <li>부산</li>
          <li>경기도</li>
          <li>인천</li>
          <li>충청도</li>
          <li>경상도</li>
          <li>전라도</li>
        </ul>
        <div id="accompany-list-search-write">
          <Input placeholder="Search" inputProps={ariaLabel} />
          <SearchIcon color='secondary' />
          <Link to="/accompany/write">
            <Button variant="contained">WRITE</Button>
          </Link>
        </div>
        <div id="accompany-list-each">
          <div onClick={handlerOpenDetail}>
            <AccompanyEach />
          </div>
          <AccompanyEach />

          <AccompanyEach />
          <AccompanyEach />
          <AccompanyEach />
          <AccompanyEach />
          <AccompanyEach />
          <AccompanyEach />
          <AccompanyEach />
          <AccompanyEach />
          <AccompanyEach />
          <AccompanyEach />
          <AccompanyEach />
          <AccompanyEach />
          <AccompanyEach />
          <AccompanyEach />
          <AccompanyEach />
        </div>
      </div>
    </Frame>
  )
}
export default Accompany;