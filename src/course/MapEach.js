import axios from 'axios';
import './MapEach.css';
import PinDropRoundedIcon from '@mui/icons-material/PinDropRounded';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const MapEach = (props) => {


  // onClick={props.modalOpen}
  return (
    <>
      <div id="map-each-wrap" >
        <div id="map-each-head-wrap">
          <div id="map-each-user-img">
            <PinDropRoundedIcon fontSize='large' />
            <img src="https://i.pinimg.com/564x/38/eb/7a/38eb7a74270f3e480224ffe26cb9d7d3.jpg" />
          </div>
          <div id="map-each-user-info">
            <div id="map-each-user-userid">
              작성자ID
            </div>
            <div id="map-each-date-area">
              <span>2023.06.01~2023.06.02</span><br />
              <span>경기도</span>
            </div>
          </div>
        </div>
        <div id="map-each-main-img" onClick={props.modalOpen}>
          <img src="https://i.pinimg.com/564x/eb/d9/1a/ebd91a5fa8ccfec0f0dbc9a9eb31fb75.jpg" />
        </div>
        <div id="map-each-course-info">
          <div id="map-each-course-title">
            <span>여행코스 제목이닷</span>
          </div>
          <div id="map-each-course-wrap">
            <ArrowBackIosNewIcon />
            <div id="map-each-course-days">
              <div id="map-each-course-day">DAY1</div>
              <div id="map-each-course-list">
                <span>코스1</span>
                <span>코오오스2</span>
                <span>코스3</span>
                <span>코스4</span>
                <span>코오오오스5</span>
                <span>코스6</span>
                <span>코스7</span>
              </div>
            </div>
            <ArrowForwardIosIcon />
          </div>
        </div>
      </div>
      
    </>
  )
}
export default MapEach;