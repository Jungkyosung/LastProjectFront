import React, { useEffect, useRef, useState } from 'react';
import './AboutUs.css';
import way from './img/way.gif'
import run from './img/run.gif'
import black from './img/black.jpg'
import gang from './img/gang.gif'
import bok from './img/bok.gif'
import { Link } from 'react-router-dom';
import useScrollFadeIn from './useScrollFadeIn';
import panorama from './img/panorama.png'
import Modal from '../modal/Modal';

function AboutUs() {
    //슬라이드스크롤?애니메이션
    const sliderRef = useRef(null);
    const overflowRef = useRef(null);

    //스크롤애니메이션              방향, 지속시간, 지연시간
    const aAnimation = useScrollFadeIn('left', 0.7, 0);
    const bAnimation = useScrollFadeIn('right', 0.7, 0);
    const oAnimation = useScrollFadeIn('right', 1, 3);
    const uAnimation = useScrollFadeIn('up', 1, 0);
    const tAnimation = useScrollFadeIn('up', 0.8, 5);

    //모달 노출 여부 state
    const [modalOpen, setModalOpen] = useState(false);
    //모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };



    useEffect(() => {
        // 슬라이드 위치에 따른 투명도 조절
        const handleScroll = () => {
            const op = 1 - (window.pageYOffset / sliderRef.current.offsetHeight);
            sliderRef.current.style.opacity = op;
        };
        // 창 크기가 조정 될 때마다 호출
        const handleResize = () => {
            // overflow의 상단 위치를 설정 top
            overflowRef.current.style.top = sliderRef.current.offsetHeight + 'px';
            // slider 높이, 오버플로우를 슬라이더 아래에 겹쳐지게 설정하기 위해 top 값을 슬라이더 높이로 설정
        };

        // 스크롤,창크기조정 이벤트가 발생 시 핸들러 스크롤,리사이즈 를 호출
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        handleScroll(); // 초기 렌더링 시에도 적용되도록 호출
        handleResize(); // 초기 렌더링 시에도 적용되도록 호출

        // 컴포넌트가 언마운트 될 때 이벤트 리스너를 제거
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    
    return (
        <>
            <div className="pic" id="slider" ref={sliderRef}>
                <Link to="/">
                    <img src="https://blog.kakaocdn.net/dn/BLiDh/btrGt2jM9dx/MsTAf6D49dQD0Bjlbollok/img.jpg" alt="Slider" style={{ width: '50%', height: '50%', opacity: 0.5, borderRadius: '30%' }} />
                </Link>
                <div>인트로페이지를 한번 시도해 보았습니다<br />
                    우리조 이름이 진짜 가자 인가요?<br />
                    어딜 가죠?<br />
                    화양사거리쪽에 <a href="https://www.goodchoice.kr/product/detail?ano=69527" target="_blank">de gaja</a>라는 곳이 있긴 한데....
                </div>
            </div>
            <div className="pic2" id="overflow" ref={overflowRef} style={{ height: '500vh' }} >
                {/* <img src={panorama} alt="Overflow" /> */}

                <div class="container">
                    <img class="box" ref={bAnimation.ref} style={bAnimation.style} src={way} alt="Overflow" />
                    <div class="box1" ref={aAnimation.ref} style={aAnimation.style}>이렇게 하면은</div>
                </div>
                <div class="container">
                    <img class="box3" ref={oAnimation.ref} style={oAnimation.style} src={run} alt="Overflow" />
                    <div class="box2" ref={uAnimation.ref} style={uAnimation.style}>어떻게 나올까요</div>
                </div>
                <div>
                    <button onClick={showModal}>모달</button>
                    {modalOpen && <Modal setModalOpen={setModalOpen} />}
                </div>
                <img src={gang} alt="Overflow" style={{ borderRadius: '10%' }} />
                <img src={black} alt="Overflow" ref={tAnimation.ref} style={tAnimation.style} />
                <img src={bok} alt="Overflow" style={{ borderRadius: '15%' }} />
            </div>
        </>

    );
}

export default AboutUs;