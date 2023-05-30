import { Reset } from "styled-reset";
import SubMenu from "../platform/SubMenu";
import MainMenu from "../platform/MainMenu";
import Footer from "../platform/Footer";


const Frame = ({children, isLogin, setIsLogin}) => {
    return (
        <>
            <Reset />
            <SubMenu isLogin={isLogin} setIsLogin={setIsLogin} />
            <MainMenu />
            {/* <DetailMenu /> */}
                {children}
            <Footer />
        </>
    )
}
export default Frame;