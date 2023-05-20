import './MobileMainMenu.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const MobileMainMenu = () => {
    return (
        <>
            <div id="mobile-mainmenu-window">
                <Link to="/" ><div>LOGO</div></Link>
                
                <p>ABOUT US</p>
                <hr />
                <ul>지금 한국은
                    <li>음식</li>
                    <li>패션</li>
                    <li>문화</li>
                </ul>

                <hr />
                <ul>여행정보
                    <li>날씨</li>
                    <li>여행코스</li>
                    <li>카드뉴스</li>
                </ul>
                <hr />
                <ul>커뮤니티
                    <li>글로벌채팅</li>
                    <li>웹만화</li>
                    <li>어디까지</li>
                    <li>여행친구</li>
                    <li>이상과현실</li>
                    <li>물가체험</li>
                </ul>
            </div>
        </>
    )
}
export default MobileMainMenu;