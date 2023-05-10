import { useEffect } from "react";
import TriedItem from "./TriedItem";

const TriedList = ({ data, triedCategoryIdx, order, year }) => {
// const triedCategoryIdx = 1;
// const order = "recent";
// const year = "2023;"

    let filteredData = [];
    if (Array.isArray(data)) {
        filteredData = data.filter((tried) => tried.triedCategoryIdx === triedCategoryIdx);
    }

    // const filteredData = data.filter((tried) => {
    //     return tried.triedCategoryIdx === triedCategoryIdx;
    // });

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
    })

    useEffect(() => {
        console.log("Data updated");
    }, [data, order]);

    return (
        <>
            <div className="triedList-container">

                {sortedData.map((tried) => (
                    <div
                        key={tried.triedIdx}>
                        <TriedItem
                            key={tried.triedIdx}
                            tried={tried} />
                    </div>
                ))}
            </div >
        </>
    );
};

export default TriedList;