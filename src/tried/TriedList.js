import { useEffect, useState } from "react";
import TriedItem from "./TriedItem";
import axios from "axios";

const TriedList = ({ data, triedCategoryIdx }) => {
  const [triedImg, setTriedImg] = useState([]);

  // let filteredData = [];
  // if (Array.isArray(data)) {
  //   filteredData = data.filter((tried) => tried.triedCategoryIdx === triedCategoryIdx);
  // }


useEffect(() => {
  const fetchImages = async () => {
    const imageUrls = {};
    for (const tried of data) {
      if (tried.triedCategoryIdx === triedCategoryIdx) {
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
    }
    setTriedImg(imageUrls);
  };

  fetchImages();
}, [data]);

  // // 최신순, 추천순 정렬
  // const sortedData = filteredData.sort((a, b) => {
  //   if (order === "recent") {
  //     // 최신순 정렬
  //     return new Date(b.triedCreatedTime) - new Date(a.triedCreatedTime);
  //   } else if (order === "rcmd") {
  //     // 추천순 정렬
  //     return b.triedRcmd - a.triedRcmd
  //   } else {
  //     return 0;
  //   }
  // });
  // console.log(data);

  return (
    <>
      <div className="triedList-container">
        { data && data.map((tried) => (
          <div key={tried.triedIdx}>
            <TriedItem
              
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


  // useEffect(() => {
  // const fetchImages = async () => {
    // const filteredData = data.filter(
    //   (tried) => tried.triedCategoryIdx === triedCategoryIdx);
    // const imageUrls = {};
    // for (const tried of filteredData) {
  //   for (const tried of data) {                           // 추가
  //     if (tried.triedCategoryIdx === triedCategoryIdx) {  // 
  //       try {
  //         const response = await axios.get(`http://localhost:8080/api/getImage/${tried.triedImg}`, {
  //           responseType: "arraybuffer",
  //         });
  //         const imageBlob = new Blob([response.data], {
  //           type: response.headers["Content-Type"],
  //         });
  //         const imageUrl = URL.createObjectURL(imageBlob);
  //         imageUrls[tried.triedIdx] = imageUrl;
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     setTriedImg(imageUrls);
  //   }
  //   fetchImages();
  // }, [data, triedCategoryIdx]);
