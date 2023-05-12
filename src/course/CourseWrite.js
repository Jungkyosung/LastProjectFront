import './CourseWrite.css';
import React, { useState } from "react";
import { Chip, Input } from "@mui/material";


function CourseWrite() {
    const [placeName, setPlaceName] = useState(['서울숲', '탑골공원', '고재량', '종로3가', '경복궁']);

    const handleDelete = (e) => {
        setPlaceName((places) => places.filter((place) => place.key !== e.key));
    }

    return (
        <>
            <div className="course-date-pick-wrap">
                <h2>DAY1</h2>
                <div className="course-date-pick-chips">
                    <Chip label={placeName[0]} />
                    <Chip label={placeName[1]} />
                    <Chip label={placeName[2]} />
                    <Chip label={placeName[3]} />
                    <Chip label={placeName[4]} />
                </div>
                <div className="course-date-pick-description">
                    <h2>코스 설명 어쩌구 저쩌구 이러쿵 저러쿵</h2>
                </div>
            </div>

            <div id="course-date-wrap">
                <h2>DAY2</h2>
                <div id="course-date-chips">
                    <Chip label={placeName[0]} onDelete={handleDelete} />
                    <Chip label={placeName[1]} onDelete={handleDelete} />
                    <Chip label={placeName[2]} onDelete={handleDelete} />
                </div>
                <div id="course-date-picker-input">
                    <Input placeholder="express this course" />
                </div>
            </div>

            
        </>
    );
}

export default CourseWrite;