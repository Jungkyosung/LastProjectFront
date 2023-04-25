import { useState } from "react";

function LNButton() {

    const [sortType, setSortType] = useState('star');

    const handlerLike = () => {
        setSortType('star');
    }

    const handlerDate = () => {
        setSortType('opening');

    }

    return (

        <>

            <button onClick={handlerDate}>인기</button>
            <button onClick={handlerLike}>최신</button>

        </>
    )
}

export default LNButton;