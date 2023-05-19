import { Link } from "react-router-dom";

const SubMenu = () => {
    
    return (
        <>
            <ul>
                <li><Link to="/">NOTICE</Link></li>
                <li><Link to="/">HELP</Link></li>
                <li><Link to="/">회원가입</Link></li>
                <li><Link to="/">로그인</Link></li>
            </ul>
        </>
    )
}

export default SubMenu;