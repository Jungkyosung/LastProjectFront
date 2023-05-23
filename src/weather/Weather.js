import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";
import winter from './img/winter.jpg';
import earlyWinter from './img/earlyWinter.jpg';
import beginWinter from './img/beginWinter.jpg';
import earlySpring from './img/earlySpring.jpg';
import spring from './img/spring.jpg';
import earlySummer from './img/earlySummer.jpg';
import beginSummer from './img/beginSummer.jpg';
import summer from './img/summer.jpg';
import hotSummer from './img/hotSummer.jpg';
import Frame from "../main/Frame";
import CircularProgress from '@mui/material/CircularProgress';

const Weather = () => {

  const [weatherResult, setWeatherResult] = useState({});
  const [cities, setCities] = useState([]);
  const [temperature, setTemperature] = useState(0);
  const [units, setUnits] = useState('metric');
  const [clothesImg, setClothesImg] = useState(null);

  const [loading, setLoading] = useState(true);

  // 현재 날짜
  const today = new Date();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let day = ""
  switch (today.getDay()) {
    case 0:
      day = "일요일";
      break;
    case 1:
      day = "월요일";
      break;
    case 2:
      day = "화요일";
      break;
    case 3:
      day = "수요일";
      break;
    case 4:
      day = "목요일";
      break;
    case 5:
      day = "금요일";
      break;
    case 6:
      day = "토요일";
      break;
  };

  //#2
  // 현재 위치
  const getCurrentLocation = () => {
    // 사용자의 현재 위치를 요청
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);  //<-#3 현재 위치 날씨
    });
  };

  //#3
  // 현재 위치 날씨
  const getWeatherByCurrentLocation = async (lat, lon) => {
    setLoading(true);
    try {
      const { data } = await axios({
        method: 'get',
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a14996009fd1cec14f59d1e28fb8f628&units=${units}`
        // url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=${units}`
      });
      data.main.temp = Math.floor(data.main.temp, 1);
      setWeatherResult(data);
      setLoading(false);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  //#1
  // 컴포넌트 마운트시 현재 위치 가져오기
  useEffect(() => {
    getCurrentLocation(); //<-#2 현재 위치
  }, []);


  // API 에서 받아온 현재 날씨
  useEffect(() => {
    if (weatherResult.main) {
      //온도 소수점 제거하여 추출
      const temperature = Math.floor(weatherResult.main.temp).toFixed(0);
      setTemperature(temperature);
      selectClothes(temperature);
    }
  }, [weatherResult]);

  // 섭씨/화씨 변환
  const celsiusToFahrenheit = (celsius) => {
    // 섭씨 -> 화씨
    const fahrenheit = (celsius * 9 / 5) + 32;
    return fahrenheit.toFixed(0);
  }

  const fahrenheitToCelsius = (fahrenheit) => {
    // 화씨 -> 섭씨
    const celsius = (fahrenheit - 32) * 5 / 9;
    return celsius.toFixed(0);
  }

  // // weatherResult에서 받아 온 현재 온도 값
  // useEffect(() => {
  //   if (weatheResult.main) {
  //     const temperature = weatheResult.main.temp.toFixed(0);
  //     setTemperature(temperature);
  //   }
  // }, [weatheResult]);


  // 도시 클릭 (지도 이미지로 변경 예정)
  const searchWeather = async (cities) => {
    try {
      const { data } = await axios({
        method: 'get',
        // url: `https://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=${apiKey}`
        url: `https://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=a14996009fd1cec14f59d1e28fb8f628&units=${units}`
      });
      data.main.temp = Math.floor(data.main.temp, 1);
      setWeatherResult(data);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  // 도시 별 기온 가져 옴
  useEffect(() => {
    setCities(['Seoul', 'Busan', 'Jeonju', 'Inchon', 'Daegu', 'Gwangju', 'Daejeon', 'Ulsan', 'Jeju', 'Sejong'])
   
  }, []);

  // 버튼 클릭 시 temperature 값을 변환한 값으로 변경
  const handleConvertTemperature = () => {
    if (units === 'metric') {
      // 섭씨 -> 화씨
      const fahrenheit = celsiusToFahrenheit(temperature);
      setUnits('imperial');
      setTemperature(fahrenheit);
    } else if (units === 'imperial') {
      // 화씨 -> 섭씨
      const celsius = fahrenheitToCelsius(temperature);
      setUnits('metric');
      setTemperature(celsius);
    }
  }


  // 날씨 아이콘  => 이미지 변경
  //WeatherResult.weater[0].icon
  const weathericonUrl = <img src={`http://openweathermap.org/img/wn/${weatherResult.weather && weatherResult.weather[0].icon}.png`}
    alt={`${weatherResult.weather && weatherResult.weather[0].description}`} />;


  // 온도에 따른 옷차림
  const selectClothes = (temperature) => {

    if (temperature <= 0) {
      setClothesImg(<img src={winter} />);
    } else if (temperature >= 0 && temperature <= 5) {
      setClothesImg(<img src={earlyWinter} />);
    } else if (temperature >= 6 && temperature <= 9) {
      setClothesImg(<img src={beginWinter} />);
    } else if (temperature >= 10 && temperature <= 11) {
      setClothesImg(<img src={earlySpring} />);
    } else if (temperature >= 12 && temperature <= 16) {
      setClothesImg(<img src={spring} />);
    } else if (temperature >= 17 && temperature <= 19) {
      setClothesImg(<img src={earlySummer} />);
    } else if (temperature >= 20 && temperature <= 22) {
      setClothesImg(<img src={beginSummer} />);
    } else if (temperature >= 23 && temperature <= 27) {
      setClothesImg(<img src={summer} />);
    } else {
      setClothesImg(<img src={hotSummer} />);
    }
  };

  // useEffect(() => {
  //   if (weatheResult.main) {
  //     const temperature = weatheResult.main.temp;
  //     setTemperature(temperature);
  //     selectClothes(temperature);
  //   }
  // }, [weatheResult]);


  return (
    <Frame>
      <div className="AppWrap">
        {loading ? <CircularProgress color="secondary" /> : null}
        <div className="AppContentsWrap">
          <div id="title">
            <p>Weather</p>
          </div>
          <div id="date"> {month + "월 " + date + "일 " + day} </div>
          {
            Object.keys(weatherResult).length !== 0 && (
              <div className="resultWrap">
                <div className="city">
                  {/* 현재 위치 도시 */}
                  {weatherResult.name}
                </div>
                <div className="skyIcon">
                  {/* 날씨 아이콘 */}
                  {weathericonUrl}
                </div>
                <div className="sky">
                  {/* 현재 날씨 */}
                  {weatherResult.weather[0].main}
                </div>
                <div className="temperature">
                  {/* 현재 온도 */}
                  현재 기온 : {temperature}
                  <button onClick={handleConvertTemperature}>
                    {/* 섭씨/화씨 버튼 */}
                    {units === 'metric' ? '°C' : '°F'}
                  </button>
                </div>
                <div className="clothesImg">
                  {/* 옷차림 이미지 */}
                  추천 옷차림 : {clothesImg}
                </div>
              </div>
            )
          }
          <div className="cityButtons">
            {cities.map((city) => (
              <button className="cityBtn" key={city} onClick={() => searchWeather(city)}>
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
};

export default Weather;