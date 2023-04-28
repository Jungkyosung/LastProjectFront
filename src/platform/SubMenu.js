import { Link, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

const SubMenu = () => {

    let nickName = null;
    let jwtToken = null;
    if (sessionStorage.getItem('token') != null) {
        jwtToken = sessionStorage.getItem('token');
        nickName = jwt_decode(jwtToken).nickname;
    }

    const navigate = useNavigate();

    //[로그아웃 핸들러]
    const handlerLogout = () => {
        sessionStorage.clear();
        navigate("/");
        alert('로그아웃 되었습니다.')
    }

    return (
        <>
            <ul>
                <li>NOTICE</li>
                <li>HELP</li>
                {
                    nickName == null ?
                        <>
                            <Link to="/regist">
                                <li>회원가입</li>
                            </Link>
                            <Link to="/login">
                                <li>로그인</li>
                            </Link>
                        </>
                        :
                        <>
                            Hello {nickName}
                            <button onClick={handlerLogout}>로그아웃</button>
                        </>
                }
            </ul>
        </>
    )
}

export default SubMenu;
