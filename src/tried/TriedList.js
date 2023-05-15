import './TriedList.css';
import { useEffect, useState } from "react";
import TriedItem from "./TriedItem";
import axios from "axios";
import Frame from "../main/Frame";
import TriedCategory from './TriedCategory';

const TriedList = ({ data, triedCategoryIdx, order, year }) => {
    // const [triedImg, setTriedImg] = useState([]);

    // let filteredData = [];
    // if (Array.isArray(data)) {
    //     filteredData = data.filter((tried) => tried.triedCategoryIdx === triedCategoryIdx);
    // }

    // const sortedData = filteredData.sort((a, b) => {
    //     if (order === "recent") {
    //         // 최신순 정렬
    //         return new Date(b.triedCreatedTime) - new Date(a.triedCreatedTime);
    //     } else if (order === "rcmd") {
    //         // 추천순 정렬
    //         return b.triedRcmd - a.triedRcmd
    //     } else {
    //         return 0;
    //     }
    // });

    // useEffect(() => {
    //     const fetchImages = async () => {
    //         const imageUrls = {};
    //         for (const tried of sortedData) {
    //             try {
    //                 const response = await axios.get(`http://localhost:8080/api/getImage/${tried.triedImg}`, {
    //                     responseType: "arraybuffer",
    //                 });
    //                 const imageBlob = new Blob([response.data], {
    //                     type: response.headers["Content-Type"],
    //                 });
    //                 const imageUrl = URL.createObjectURL(imageBlob);
    //                 imageUrls[tried.triedIdx] = imageUrl;
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         }
    //         setTriedImg(imageUrls);
    //     };

    //     fetchImages();
    // }, [sortedData]);

    return (
        <Frame>
            <div id="tried-main-list-img">
                <img src="https://64.media.tumblr.com/3e4755ab569aac3466a85dc842f8c958/tumblr_muvfkcviyV1qkyzm3o1_1280.jpg" />
            </div>
            <div className="triedlist-wrap">
                <TriedCategory/>
                <div className='triedlist-items'>
                    <div className='triedlist-item'>
                        <TriedItem/>
                    </div>
                </div>
                {/* {sortedData.map((tried) => (
                    <div key={tried.triedIdx}>
                        <TriedItem
                            key={tried.triedIdx}
                            tried={tried}
                            imageUrl={triedImg[tried.triedIdx]}
                        />
                    </div>
                ))} */}
            </div >
        </Frame>
    );
};

export default TriedList;