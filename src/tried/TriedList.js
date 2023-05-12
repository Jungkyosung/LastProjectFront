import { useEffect, useState } from "react";
import TriedItem from "./TriedItem";
import axios from "axios";

const TriedList = ({ data, triedCategoryIdx, order, year }) => {
    const [triedImg, setTriedImg] = useState([]);

    let filteredData = [];
    if (Array.isArray(data)) {
        filteredData = data.filter((tried) => tried.triedCategoryIdx === triedCategoryIdx);
    }

    const sortedData = filteredData.sort((a, b) => {
        if (order === "recent") {
            // 최신순 정렬
            return new Date(b.triedCreatedTime) - new Date(a.triedCreatedTime);
        } else if (order === "rcmd") {
            // 추천순 정렬
            return b.triedRcmd - a.triedRcmd
        } else {
            return 0;
        }
    });

    useEffect(() => {
        const fetchImages = async () => {
          const imageUrls = {};
          for (const tried of sortedData) {
            try {
              const response = await axios.get(`http://localhost:8080/api/getImage/${tried.triedImg}`, {
                responseType: "arraybuffer",
              });
              const imageBlob = new Blob([response.data], {
                type: response.headers["Content-Type"],
              });
              const imageUrl = URL.createObjectURL(imageBlob);
              imageUrls[tried.triedIdx] = imageUrl;
            } catch (error) {
              console.log(error);
            }
          }
          setTriedImg(imageUrls);
        };
    
        fetchImages();
      }, [sortedData]);

    return (
        <>
            <div className="triedList-container">
                {sortedData.map((tried) => (
                    <div key={tried.triedIdx}>
                        <TriedItem
                            key={tried.triedIdx}
                            tried={tried}
                            imageUrl={triedImg[tried.triedIdx]}
                        />
                    </div>
                ))}
            </div >
        </>
    );
};

export default TriedList;