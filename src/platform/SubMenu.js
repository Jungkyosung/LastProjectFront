import { Link } from "react-router-dom";

const SubMenu = () => {
    return (
        <>
            <ul>
                <li>NOTICE</li>
                <li>HELP</li>
                <Link to="/regist">
                    <li>회원가입</li>
                </Link>
                <Link to="/login">
                    <li>로그인</li>
                </Link>
            </ul>
        </>
    )
}

export default SubMenu;