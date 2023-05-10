import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TriedCategory = ({ triedCategoryIdx, setTriedCategoryIdx, order, setOrder, year, setYear }) => {
    const [data, setData] = useState([]);
    const handleClick = (categoryIdx) => {
        setTriedCategoryIdx(categoryIdx);
    }
    // 데이터를 가지고 오는 로직
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios
                    .get(`http://localhost:8080/api/tried/1/${order}/${year}-01-01/${year}-12-31/1`);
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [triedCategoryIdx, order, year]);

    return (
        <div className="triedCategory">
            <button
                className={triedCategoryIdx === 1 ? "active" : ""}
                onClick={() => handleClick(1)}>
                음식
            </button>
            {console.log("11111" + triedCategoryIdx)}
            <button
                // className={triedCategoryIdx === 1 ? "active" : ""}
                onClick={() => handleClick(2)}>
                장소
            </button>
            {console.log("22222" + triedCategoryIdx)}
            <button
                // className={triedCategoryIdx === 1 ? "active" : ""}
                onClick={() => handleClick(3)}>
                문화
            </button>
            {console.log("33333" + triedCategoryIdx)}

            <div className="order">
                <select value={order}
                    onChange={(e) => setOrder(e.target.value)}>
                    <option value="recent">최신순</option>
                    <option value="rcmd">추천순</option>
                </select>
            </div>
            <div className="year">
                <select type="number" value={year}
                    onChange={(e) => setYear(e.target.value)} >
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                </select>
            </div>
        </div >
    )
}

export default TriedCategory;

{/* <div className="order">
<select value={order} onChange={(e) => setOrder(e.target.value)}>
    <option value="recent">최신순</option>
    <option value="rcmd">추천순</option>
</select>
</div>
<div className="year">
<select type="number" value={year}
    onChange={(e) => setYear(e.target.value)} >
    <option value="2023">2023</option>
    <option value="2022">2022</option>
    <option value="2021">2021</option>
</select>
</div> */}

{/* <div value="1" onClick={() => setTriedCategoryIdx(1)}>음식</div> */ }
{/* <div value="2" onClick={() => setTriedCategoryIdx(2)}>장소</div> */ }
{/* <div value="3" onClick={() => setTriedCategoryIdx(3)}>문화</div> */ }


{/* <Link to={`/category/${triedCategoryIdx}`} onClick={() => setTriedCategoryIdx(1)}> 음식 </Link> */ }
{/* <Link to={`/category/${triedCategoryIdx}`} onClick={() => setTriedCategoryIdx(2)}> 장소 </Link> */ }
{/* <Link to={`/category/${triedCategoryIdx}`} onClick={() => setTriedCategoryIdx(3)}> 문화 </Link> */ }

