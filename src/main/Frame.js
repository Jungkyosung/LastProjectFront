import { Reset } from "styled-reset";
import SubMenu from "../platform/SubMenu";
import MainMenu from "../platform/MainMenu";
import DetailMenu from "../platform/DetailMenu";
import Footer from "../platform/Footer";
import ChatPort from "../chat/ChatPort";
import { useState } from "react";
import ChatParent from "../chat/ChatParent";
import "./Frame.css";
import { useNavigate } from 'react-router-dom';

const Frame = ({ children }) => {

    const [isChatModal, setIsChatIsModal] = useState(true);
    const navigate = useNavigate();

    let isLogin = false;

    if (sessionStorage.getItem('token') != null) {
        isLogin = true;
    }

    const handlerChatModal = () => {
        if (isChatModal) {
            setIsChatIsModal(false);
            console.log(isChatModal);
        } else {
            setIsChatIsModal(true);
        };
    };

    const handlerChatPage = () => {
        navigate('/mobilechat');
    }

    return (
        <>
            <Reset />
            <SubMenu />
            <div id="mainmenu">
                <MainMenu />
            </div>
            {children}
            {isLogin && isChatModal &&
                <>
                    <div id="chatport-web" onClick={handlerChatModal}>
                        <ChatPort />
                    </div>
                    <div id="chatport-mobile" onClick={handlerChatPage}>
                        <ChatPort />
                    </div>
                </>
            }
            {isLogin && !isChatModal &&
                <ChatParent handlerChatModal={handlerChatModal} />
            }
            <Footer />
        </>
    )
}
export default Frame;