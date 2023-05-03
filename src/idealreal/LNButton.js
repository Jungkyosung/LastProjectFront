import { useState } from "react";

function LNButton() {

    const [sortType, setSortType] = useState('Thumb');
    const [date, setDate] = useState('')
    const [like, setLike] = useState('')

    const handlerLike = () => {
        setSortType('Thumb');
    }

    const handlerDate = () => {
        setSortType('opening');

    }

    // const orderedDate = idealreal.sort((a, b) =>{;return(new Date(a.opening) - new Date(b.opening))})

    return (

        <>

            <button onClick={handlerDate}>인기</button>
            <button onClick={handlerLike}>최신</button>

        </>
    )
}

export default LNButton;