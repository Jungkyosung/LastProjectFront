import { useState } from "react";

function LNButton() {

    const [sortType, setSortType] = useState('Thumb');
    const [date, setDate] = useState('')
    const [like, setLike] = useState('')
    const [idealrealIdx, setIdealrealIdx] = useState([])
    const [idealrealCreatedTime, setIdealrealCreatedTime] = useState([])

    const handlerLike = () => {
        setSortType('Thumb');
    }

    const handlerDate = () => {
        setSortType('idealrealCreatedTime');

    }

    const buttonContainer = {
        marginLeft: 'auto',
        width: '100px',
        height: '30px',
        background: '#8f86bb',
        color: 'snow',
        fontSize: '17px',
        borderRadius: '10px',
        marginTop: '50px',
        textAlign: 'center',
        lineHeight: '30px'
    }

    // const orderedDate = idealreal.sort((a, b) =>{;return(new Date(a.idealrealCreatedTime) - new Date(b.idealrealCreatedTime))})

    return (

        <>

            <button style={buttonContainer} onClick={handlerDate}>인기</button>
            <button style={buttonContainer} onClick={handlerLike}>최신</button>

        </>
    )
}

export default LNButton;