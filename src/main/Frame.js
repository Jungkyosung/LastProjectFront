import { Reset } from "styled-reset";
import SubMenu from "../platform/SubMenu";
import MainMenu from "../platform/MainMenu";
import DetailMenu from "../platform/DetailMenu";
import Footer from "../platform/Footer";

const Frame = ({children}) => {

    return (
        <>
            <Reset />
            <SubMenu />
            <MainMenu />
            <DetailMenu />
                {children}
            <Footer />
        </>
    )
}
export default Frame;