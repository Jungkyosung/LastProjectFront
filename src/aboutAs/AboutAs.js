import React, { useEffect, useRef } from 'react';
import './AboutAs.css';
import way from './img/way.gif';
import run from './img/run.gif';
import black from './img/black.jpg';
import gajawine from './img/gajawine.png';
import { Link } from 'react-router-dom';

function AboutAs() {
    const sliderRef = useRef(null);
    const overflowRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const op = 1 - (window.pageYOffset / sliderRef.current.offsetHeight);
            sliderRef.current.style.opacity = op;
        };

        const handleResize = () => {
            overflowRef.current.style.top = sliderRef.current.offsetHeight + 'px';
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        handleScroll(); // 초기 렌더링 시에도 적용되도록 호출
        handleResize(); // 초기 렌더링 시에도 적용되도록 호출

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
        
            <div class="pic" id="slider" ref={sliderRef}>
                <div class="wrapper" >시작은 방대한 꿈을 꾸었지만<br />
                    이카루스와 같이 추락해버린 우리<br />
                    G.A.J.A. 를 소개 합니다<br />
                    Global Area Just Advance<br/>
                    <a href="https://www.goodchoice.kr/product/detail?ano=69527" target="_blank">de gaja</a>
                    <Link to="/">
                        <img src={gajawine} style={{width:'9%', opacity: 0.5}} alt="Slider" />
                        </Link>
                </div>
                <img class="logo" src="https://cdn-dantats.stunning.kr/prod/portfolios/de10725d-18ab-4e17-a8ab-4453ea563a2a/covers/ORDER_SUB_121771_1_150520115641.jpg" alt="Slider" />
            </div>
            <div id="overflow" ref={overflowRef} >
                <div class="container">
                    <img class="box" src={way} alt="Overflow" style={{ width: '60%', height: '50%', borderRadius: '10%' }} />
                    <div class="box1">무엇을 할까 여러 생각과 의견이 많았지만<br/>
                    이것저것 나오다 무산되고 계획조차 설립하지 못 하였지만<br/>
                    거창한 꿈을 잠시나마 꾸었습니다.<br/>
                    하지만 현실을 직시하게 되엇고<br/>
                    현실의 현실은 더욱 잔인했었습니다<br/>
                    우리가 하고싶고 다른 사람들이 하지 않는것을 생각하다<br/>
                    공통적으로 수업따윈 다 때려치우고 여행을 가고싶었습니다<br/>
                    그렇게 나온게 이번 프로젝트의 주제<br/>
                    여행을 주제로 한 이 홈페이지가 되었습니다<br/>
                    여행도 어느 여행으로 하는가 생각하다가<br/>
                    많은 생각과 계획이 나오고 무너졌지만 <br/>
                    이대로는 안된다 다들 잘 할 수 있는 표본을 구하자 하여<br/>
                    <Link to="https://triple.guide/intro?NaPm=ct%3Dlhtzpi46%7Cci%3Dcheckout%7Ctr%3Dds%7Ctrx%3Dnull%7Chk%3Dad74abb56877c11a86f5b0c3703ede2995815a08">
                    트리플</Link>
                    과 
                    <Link to="https://tripsoda.com/community">
                    모두의여행</Link>
                    을 참고하여 시작하게되었습니다</div>
                </div>
                <div class="container">
                    <img class="box3" src={run} alt="Overflow" />
                    <div class="box2">현재 한국이라는 나라는 세계적으로 많이 알리게 되엇고<br/>
                    외국인 관광객들이 해마다 늘고있는 추세입니다<br/>
                    거기까지 생각이 끼친 저희는 이 목표를 가지고 시작을 하였습죠<br/>
                    내가 외국인이라면, 내가 외국을 여행을 한다면<br/>
                    무엇을 먼저 생각하고 무엇에 관심을 가질까<br/>
                    처음부터 생각을 해보니 해야 할것들이 너무 많아서<br/>
                    여행을 갈거야! 라는 목표를 가진 사람들을 위한 목표를 잡게 되었습죠<br/>
                    외국을 여행을 한다면, 외국인이 한국에 온다면은<br/>
                    무엇을 궁금해 하고 무엇때문에 그 나라를 가려는걸까<br/>
                    나라를 갈때 궁금증을 풀 수 있는 홈페이지를 만들어보자!<br/>
                    라고 생각하여 외국인들이 현지(한국)사람들에게 물어볼수있고 알아볼수있는<br/>
                    외국인들이 한국에 여행을 와서 여행의 기록을 남기고 자랑을 하고 추천을 할 수 있는<br/>
                    그런 의도를 가지고 만든 홈페이지 입니다<br/>
                    외국인과 한국인의 의사소통이 가능하며<br/>
                    외국인은 여행 온 외국인들의 글과 한국인들의 글을 보며 정보를 얻고<br/>
                    한국인은 대화와 글을 통해 외국인들과 소통하여 외국을 알 수도 있고<br/>
                    일석이조 삼조를 얻을수 있는 소통의 홈페이지 입니다<br/>
                    이렇게 시작된 G.A.J.A.의 전기 시작합니다.</div>
                </div>
                <img src={black} alt="Overflow" style={{ width: 'auto%', height: 'auto', borderRadius: '5%' }} />
                <div class="box1">
                조원은 고재량,김태균,이승요,정교성,조용석,최문정 총 6명이서 모여 시작을 하게 되었습니다<br/>
                기획은 다같이 힘을 합해 만들었고 프론트와 백 등 작업을 구분 하는 것 보다는<br/>
                전체적으로 다같이 할 수 있도록 기능을 맡아서 백과 프론트 등 전부 할 수 있도록 했습니다<br/>
                우선 기본적으로 sql의 기본쿼리를 짜고 백의 기본틀을 맡아서 한 정교성<br/>
                고재량이 맡은 담당은 이상형월드컵과 지도api를 가져와서 작동 할 수 있도록 하였고<br/>
                김태균은 이상과현실 메인페이지와 AboutAs페이지를 담당<br/>
                이승요는 채팅과 물가체험, 메이페이지를 담당하고<br/>
                정교성은 번역api와 환율을 담당하고 전반적으로 작업을 하였습니다.<br/>
                조용석은 QnA와 공지사항,카드뉴스를 담당하고 전반적인 css를 담당<br/>
                최문정은 어디까지 시리즈를 담당하고 오픈api를 사용하였습니다<br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                </div>
            </div>
            
        </>
    );
}

export default AboutAs;