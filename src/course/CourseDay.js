import { Chip, Input } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const CourseDay = (props) => {

    const handlerRemoveDay = props.handlerRemoveDay;
    const 장소삭제 = props.장소삭제;
    const day = props.day;
    const dayinfo = props.dayinfo;

    return (
        <>
            <div className="course-date-pick-delete-btn" onClick={handlerRemoveDay}><RemoveCircleIcon /></div>
            <h2>DAY{day}</h2>
            <div className="course-date-pick-chips">
                {dayinfo && 
                dayinfo.map( days => (
                <Chip key={days.placeName} label={days.placeName} onDelete={()=>장소삭제(day, days.placeName)}/>
                ))}

            </div>
            <div className="course-date-pick-description">
                <Input placeholder="express this course" />
            </div>
        </>
    )
}
export default CourseDay;