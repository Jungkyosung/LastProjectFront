import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Frame from "../main/Frame";

const KoreaIssueDetail = ( props ) => {
    const location = useLocation();
    // const title = location.state.title;
    // const content = location.state.content;
    // const index = location.state.index;
    // const thum_url = location.state.thum_url;
    // const broadcast_date = location.state.broadcast_date;
    const {title, content, thum_url, broadcast_date } = location.state;

    

    
    
    return(
        <Frame>
            <h2>한국 이슈</h2>

            <img src={thum_url}></img>
            <h3>{title}</h3>
            <em>{broadcast_date}</em>
            <p>{content}</p>
        </Frame>
    );
}

export default KoreaIssueDetail;