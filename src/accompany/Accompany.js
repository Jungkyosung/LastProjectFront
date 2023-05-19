import Frame from '../main/Frame';
import './Accompany.css';
import AccompanyEach from './AccompanyEach';
import Input from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import './AccompanyEach.css';
import DateRangeIcon from '@mui/icons-material/DateRange';


// const ariaLabel = { 'aria-label': 'description' };


const Accompany = () => {

  const [datas, setDatas] = useState([]);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [pageCount, setPageCount] = useState(0);

  const refSearchInput = useRef();

  const lengthDifference = 9 - datas.length;

  const navigate = useNavigate();

  const handlerOpenDetail = (accompanyIdx) => {
    navigate(`/accompany/detail/${accompanyIdx}`);
  }

  const handlerChange = (event, value) => {
    console.log(event, value);
    setPages(value);
  }

  const handlerChangeSearch = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  useEffect(() => {
    const params = {
      pages: pages,
      search: search
    };
    axios.get(`http://localhost:8080/api/accompanylistbypage`, { params })
      .then(response => {
        console.log(response.data)
        setDatas(response.data);
      })
      .catch(error => {
        console.log(error);
      })

    axios.get(`http://localhost:8080/api/accompanypagecount`, { params })
      .then(response => {
        console.log(response.data)
        setPageCount(response.data);
      })
      .catch(error => {
        console.log(error);
      })

  }, [pages])

  const handlerSubmitSearch = async () => {
    console.log("클릭");
    const params = {
      pages: pages,
      search: search
    }
    try {
      const response = await axios.get(`http://localhost:8080/api/accompanylistbypage`, { params });
      console.log(response.data);
      setDatas(response.data);
      navigate(`/accompany`);
    } catch (e) {
      console.log(e);
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/accompanypagecount`, { params });
      console.log(response.data);
      setPageCount(response.data);
      navigate(`/accompany`);
    } catch (e) {
      console.log(e);
    }
    setPages(1);
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
          {/* <Input placeholder="Search" inputProps={ariaLabel}  /> */}
          <Input placeholder="Search" variant="outlined" color="primary" onChange={handlerChangeSearch} value={search} ref={refSearchInput} onKeyDown={e => { if (e.key === "Enter") { handlerSubmitSearch(e); } }} />
          <SearchIcon color='secondary' onClick={handlerSubmitSearch} />
          <Link to="/accompany/write">
            <Button variant="contained">WRITE</Button>
          </Link>
        </div>
        <div id="accompany-list-each">
          {
            datas.map((accompany) => (
              <div key={accompany.accompanyIdx} onClick={() => handlerOpenDetail(accompany.accompanyIdx)}>
                <div id="accompany-each">
                  <div id="accompany-each-title">
                    <span id="accompany-each-area">{accompany.accompanyRegion}</span>
                    <span id="accompany-each-duration">{accompany.accompanyNumbers}</span>
                    <span id="accompany-each-date"><DateRangeIcon fontSize='small' />{accompany.accompanyStartTime}-{accompany.accompanyEndTime}</span>
                  </div>
                  <div id="accompany-each-img">
                    <img src="https://i.pinimg.com/564x/30/dc/f9/30dcf99d076e79e55e519ad4240d2f6c.jpg" />
                  </div>
                  <div id="accompany-each-content">
                    {accompany.accompanyTitle}
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        {/* <div id="accompany-list-each">
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
        </div> */}
        <Pagination count={pageCount} color="primary" page={pages} onChange={handlerChange} />
      </div>
    </Frame>
  )
}
export default Accompany;