import { Link, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import "./SubMenu.css";
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useState } from "react";
import MobileMainMenu from "./MobileMainMenu";
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from "sweetalert2";

const SubMenu = (props) => {

    let nickName = null;
    let jwtToken = null;
    if (sessionStorage.getItem('token') != null) {
        jwtToken = sessionStorage.getItem('token');
        nickName = jwt_decode(jwtToken).nickname;
    }

    const navigate = useNavigate();

    const [state, setState] = useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


    //[로그아웃 핸들러]
    const handlerLogout = () => {
        Swal.fire({
            title: "log out",
            text: "Are you sure you want to log out?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'confirm',
            cancelButtonText: 'cancel'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    sessionStorage.clear();
                    navigate("/");
                }
            })
    }

    const handlerMobileMypage = ()=>{
        navigate("/mobilemypage");
    }

    const handlerMypage = ()=>{
        navigate("/mypage");
    }

    const handlerLoginpage= ()=>{
        navigate("/login");
    }


    return (
        <>
            <div className="submenu-box">
                <div className="mobile-submenu">
                    <MenuIcon onClick={toggleDrawer('left', true)}/>
                    <Drawer
                        anchor='left'
                        open={state.left}
                        onClose={toggleDrawer('left', false)}
                    >
                        <MobileMainMenu/>
                    </Drawer>
                </div>
                <div className="mobile-submenu">
                    
                    { nickName == null ?
                    <AccountCircleRoundedIcon onClick={handlerLoginpage}/>
                    :
                    <AccountCircleRoundedIcon onClick={handlerMobileMypage}/>
                    }   
                </div>
                <span id="blank-submenu"></span>
                <ul id="submenu-ul">
                    <Link to="/noticeList" ><li className="submenu-li">NOTICE</li></Link>
                    <li className="submenu-li">HELP</li>
                    {
                        nickName == null ?
                            <>
                                <Link to="/regist">
                                    <li className="submenu-li">REGIST</li>
                                </Link>
                                <Link to="/login">
                                    <li className="submenu-li">LOGIN</li>
                                </Link>
                            </>
                            :
                            <>
                                <p onClick={handlerMypage}>Hello {nickName}</p>
                                <LogoutIcon id="logout-icon" onClick={handlerLogout}/>
                            </>
                    }
                </ul>
            </div>
        </>
    )
}

export default SubMenu;
