import './TriedCategory.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

const TriedCategory = ({ triedCategoryIdx, setTriedCategoryIdx, order, setOrder, year, setYear }) => {
    // const [data, setData] = useState([]);

    // const handleClick = (triedCategoryIdx) => {
    //     setTriedCategoryIdx(triedCategoryIdx);
    // }
    // // 데이터를 가지고 오는 로직
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios
    //                 .get(`http://localhost:8080/api/tried/1/${order}/${year}-01-01/${year}-12-31/1`);
    //             setData(response.data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     fetchData();
    // }, [triedCategoryIdx, order, year]);

    return (
        <div className="tried-category-wrap">
            <div className="tried-category-idx">
                <button
                    className="active"
                > 음식
                </button>
                <button
                    className=""
                > 장소
                </button>
                <button
                    className=""
                > 문화
                </button>

                {/* <button
                    className={triedCategoryIdx === 1 ? "active" : ""}
                    onClick={() => handleClick(1)}> 음식
                </button>
                <button
                    className={triedCategoryIdx === 2 ? "active" : ""}
                    onClick={() => handleClick(2)}> 장소
                </button>
                <button
                    className={triedCategoryIdx === 3 ? "active" : ""}
                    onClick={() => handleClick(3)}> 문화
                </button> */}
            </div>
            <div className="tried-category-order">
                <select
                >
                    <option value="recent">최신순</option>
                    <option value="rcmd">추천순</option>
                </select>
                {/* <select value={order}
                    onChange={(e) => setOrder(e.target.value)}>
                    <option value="recent">최신순</option>
                    <option value="rcmd">추천순</option>
                </select> */}
            </div>
            <div className="tried-category-year">
                <select type="number">
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                </select>
                {/* <select type="number" value={year}
                    onChange={(e) => setYear(e.target.value)} >
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                </select> */}
            </div>
        </div >
    );
};

export default TriedCategory;