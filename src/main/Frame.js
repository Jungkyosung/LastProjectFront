import { Reset } from "styled-reset";
import SubMenu from "../platform/SubMenu";
import MainMenu from "../platform/MainMenu";
import DetailMenu from "../platform/DetailMenu";
import Footer from "../platform/Footer";
import ChatPort from "../chat/ChatPort";
import { useState } from "react";
import ChatParent from "../chat/ChatParent";

const Frame = ({ children }) => {

    const [isChatModal, setIsChatIsModal] = useState(true);

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

    return (
        <>
            <Reset />
            <SubMenu />
            <MainMenu />
            <DetailMenu />
            {children}
            {isLogin && isChatModal &&
                <div onClick={handlerChatModal}>
                    <ChatPort handlerChatModal={handlerChatModal}/>
                </div>
            }
            {isLogin && !isChatModal &&
                <ChatParent handlerChatModal={handlerChatModal}/>
            }
            <Footer />
        </>
    )
}
export default Frame;