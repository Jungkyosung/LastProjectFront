import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SubMenu = ({isLogin, setIsLogin}) => {
    const [user, setUser] = useState({});
    const [state, setState] = useState("logout");

    useEffect(() => {
        axios.get("http://localhost:8080/api/user",
            // { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
        )
            .then(response => {
                console.log(response.data);
                setUser(response.data);
                         
            })
            .catch(error => console.log(error));
        
    },[isLogin]);

    useEffect(()=>{
       if(sessionStorage.getItem('token') != null){
        setState('login')
        }else if(sessionStorage.getItem('token') == null){
        setState('logout')
      }
    },[isLogin])

    const logout = () => {
        sessionStorage.removeItem("token")
        setState("logout")
        setIsLogin("false")
    }

    return (
        <>
            <ul>
                <li>NOTICE</li>
                <li>HELP</li>
            </ul>
            <ul className="navbar-login">
                            {
                                state === "logout" && 
                                <>
                                    <li><Link to="/register">회원가입</Link></li>
                                    <li><Link to="/login">로그인</Link></li>
                                </>
                            }
                            {   
                                state === "login" &&
                                <>
                                    <li>{user.userName}님 환영합니다.</li>
                                    <li><button onClick={logout}>logout</button></li>
                                </>
                            }
                        </ul>
        </>
    )
}

export default SubMenu;