import React from "react";

const categories = [
    { id: 1, name: '음식' },
    { id: 2, name: '장소' },
    { id: 3, name: '문화' }
];


const TriedCategory = ({ categoryIdx, onCategorySelect }) => {
    return (
        <div className="triedCategory">
            <ul>
                <li className={categoryIdx === "음식" ? "active" : ""}
                    onClick={() => onCategorySelect("음식")}> 음식
                </li>
                <li className={categoryIdx === "여행" ? "active" : ""}
                    onClick={() => onCategorySelect("여행")}> 여행
                </li>
                <li className={categoryIdx === "문화" ? "active" : ""}
                    onClick={() => onCategorySelect("문화")}> 문화
                </li>
            </ul>
        </div>
    )
}

export default TriedCategory;