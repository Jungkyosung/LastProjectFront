import React, { useEffect, useState } from 'react';
import Frame from './Frame';
import useScrollFadeIn from './useScrollFadeIn';
import styles from './MainPage.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccompanySwiper from './AccompanySwiper';

const MainPage = () => {
  // useScrollFadeIn 훅을 사용하여 애니메이션 효과를 적용
  const koreaIssueAnimation = useScrollFadeIn('up', 2, 0);
  const accompanyAnimation = useScrollFadeIn('up', 3, 0);
  const noticeAnimation = useScrollFadeIn('up', 3, 0);

  const [koreaIssueData, setKoreaIssueData] = useState([]);

  // API 데이터 가지고 오기
  // const [pages, setPages] = useState(1);

  const loadItem = async (pageNo, numOfRows) => {
    try {

      await axios({
        method: 'get',
        url: `https://apis.data.go.kr/B551024/openArirangNewsApi/news?serviceKey=vm3aI2bB7NLgoK5kFerct8%2BZhgJnvvSJ%2FIR96WPVJpIvoOq3EI4%2FaxDBwPU6AVECGP2w3oYbhB9nwHiNwjM2nw%3D%3D&pageNo=${pageNo}&numOfRows=${numOfRows}`
      })
        .then(response => {
          //응답데이터에서 index번호 추가
          const issueItems = response.data.items;
          let arrIssueItem = [];
          for (let i = 0; i < issueItems.length; i++) {
            arrIssueItem[i] = { ...issueItems[i], index: i }
          }
          console.log(arrIssueItem);
          setKoreaIssueData(arrIssueItem);
          // setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });

    } catch (error) {
      console.log(error);
    }
  };

  // 컴포넌트 마운트 시 API 데이터 가지고 오기
  useEffect(() => {
    loadItem(2, 9);
  }, []);

  return (
    <Frame>
      <div className={styles.main_page}>
        <div className={styles.main_koreaissue} ref={koreaIssueAnimation.ref} style={koreaIssueAnimation.style}>
          <h2 className={styles.newsMain_section_title}>
            Korea
            <em className={styles.style_font}>
              Issue
            </em>
          </h2>
          <div className={styles.main_koreaissue_ul}>
            <div className={styles.main_koreaissue_li}>
              {
                koreaIssueData.length > 1 &&
                <Link to="/">
                  <div>
                    <img src={koreaIssueData[0].thum_url} />
                  </div>
                  <h3>{koreaIssueData[0].title}</h3>
                  <p>{koreaIssueData[0].content}</p>
                  <p><AccessTimeIcon style={{ fontSize: "21px", verticalAlign: "Text-top", marginRight: "5px" }} />{koreaIssueData[0].broadcast_date.substr(0, 10)}</p>
                </Link>
              }
            </div>
            <div className={styles.main_koreaissue_li}>
              {
                koreaIssueData.length > 1 &&
                <Link to="/">
                  <div>
                    <img src={koreaIssueData[1].thum_url} />
                  </div>
                  <h3>{koreaIssueData[1].title}</h3>
                  <p><AccessTimeIcon style={{ fontSize: "21px", verticalAlign: "Text-top", marginRight: "5px" }} />{koreaIssueData[1].broadcast_date.substr(0, 10)}</p>
                </Link>
              }
              {
                koreaIssueData.length > 1 &&
                <Link to="/">
                  <div>
                    <img src={koreaIssueData[2].thum_url} />
                  </div>
                  <h3>{koreaIssueData[2].title}</h3>
                  <p><AccessTimeIcon style={{ fontSize: "21px", verticalAlign: "Text-top", marginRight: "5px" }} />{koreaIssueData[2].broadcast_date.substr(0, 10)}</p>
                </Link>
              }
            </div>
            <div className={styles.main_koreaissue_li}>
              {
                koreaIssueData.length > 1 &&
                <Link to="/">
                  <h3>{koreaIssueData[3].title}</h3>
                  <p><AccessTimeIcon style={{ fontSize: "21px", verticalAlign: "Text-top", marginRight: "5px" }} />{koreaIssueData[3].broadcast_date.substr(0, 10)}</p>
                </Link>
              }
              {
                koreaIssueData.length > 1 &&
                <Link to="/">
                  <h3>{koreaIssueData[4].title}</h3>
                  <p><AccessTimeIcon style={{ fontSize: "21px", verticalAlign: "Text-top", marginRight: "5px" }} />{koreaIssueData[4].broadcast_date.substr(0, 10)}</p>
                </Link>
              }
              {
                koreaIssueData.length > 1 &&
                <Link to="/">
                  <h3>{koreaIssueData[5].title}</h3>
                  <p><AccessTimeIcon style={{ fontSize: "21px", verticalAlign: "Text-top", marginRight: "5px" }} />{koreaIssueData[5].broadcast_date.substr(0, 10)}</p>
                </Link>
              }
              {
                koreaIssueData.length > 1 &&
                <Link to="/">
                  <h3>{koreaIssueData[6].title}</h3>
                  <p><AccessTimeIcon style={{ fontSize: "21px", verticalAlign: "Text-top", marginRight: "5px" }} />{koreaIssueData[6].broadcast_date.substr(0, 10)}</p>
                </Link>
              }
              {
                koreaIssueData.length > 1 &&
                <Link to="/">
                  <h3>{koreaIssueData[7].title}</h3>
                  <p><AccessTimeIcon style={{ fontSize: "21px", verticalAlign: "Text-top", marginRight: "5px" }} />{koreaIssueData[7].broadcast_date.substr(0, 10)}</p>
                </Link>
              }
              {
                koreaIssueData.length > 1 &&
                <Link to="/">
                  <h3>{koreaIssueData[8].title}</h3>
                  <p><AccessTimeIcon style={{ fontSize: "21px", verticalAlign: "Text-top", marginRight: "5px" }} />{koreaIssueData[8].broadcast_date.substr(0, 10)}</p>
                </Link>
              }
            </div>
          </div>
        </div>
        <div className={styles.main_accompany} ref={accompanyAnimation.ref} style={accompanyAnimation.style}>
          <p>동행찾기</p>
        <div className={styles.main_accompany_ul}>
          <AccompanySwiper />
          {/* <li className={styles.main_accompany_li}>1번박스</li>
          <li className={styles.main_accompany_li}>2번박스</li>
          <li className={styles.main_accompany_li}>3번박스</li>
          <li className={styles.main_accompany_li}>4번박스</li> */}
        </div>
      </div>
      <div className={styles.main_notice} ref={noticeAnimation.ref} style={noticeAnimation.style}>
        <p>공지사항</p>
        <ul className={styles.main_notice_ul}>
          <li className={styles.main_notice_li}>1번박스</li>
          <li className={styles.main_notice_li}>2번박스</li>
        </ul>
      </div>
    </div>
    </Frame >
  );
};

export default MainPage;