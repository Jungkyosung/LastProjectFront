import './CourseWrite.css';
import React, { useState } from "react";
import { Chip, Input } from "@mui/material";
import CourseDay from './CourseDay';



function CourseWrite(props) {

    const arrCourseDay = props.arrCourseDay;
    const 데이선택핸들러 = props.데이선택핸들러;
    const 장소삭제 = props.장소삭제;

    
    //{핸들러} 일정 삭제
    const handlerRemoveDay = () => {
        console.log("삭제 클릭");
    }


    return (
        <>
            {arrCourseDay &&
                arrCourseDay.map(day => (
                    <div className="course-date-pick-wrap">
                        {/* map으로 CourseDay뿌려줌 */}
                        <>
                            <CourseDay
                                key={day.day}
                                day={day.day}
                                dayinfo={day.dayinfo}
                                handlerRemoveDay={handlerRemoveDay}
                                데이선택핸들러={데이선택핸들러} 
                                장소삭제={장소삭제}/>
                            <div onClick={() => 데이선택핸들러(day.day)}>선택</div>
                        </>

                    </div>
                ))}
        </>
    );
}

export default CourseWrite;