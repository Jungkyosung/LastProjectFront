// import { useState } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function LNButton(props) {

    const [ idealreal, setIdealreal] = useState([]) 

    useEffect(() => {
        axios.get(`http://localhost:8080/api/posts?sort=${sort}`)
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleSortChange = (e) => {
        setSort(e.target.value);
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

    const [posts, setPosts] = useState([]);
    const [sort, setSort] = useState("latest");


    return (

        //         <>

        //             <button style={buttonContainer} onClick={handlerDay}>인기</button>
        //             <button style={buttonContainer} onClick={handlerLike}>최신</button>

        //         </>
        //     )
        // }

        <div>
            <div>
                <label>
                    <input
                        type="radio"
                        value="latest"
                        checked={sort === "latest"}
                        onChange={handleSortChange}
                    />
                    최신순
                </label>
                <label>
                    <input
                        type="radio"
                        value="popular"
                        checked={sort === "popular"}
                        onChange={handleSortChange}
                    />
                    인기순
                </label>
            </div>
            <div>
                {posts.map((idealreal) => (
                    <div key={idealreal.id}>
                        <h2>{idealreal.title}</h2>
                        <img src={idealreal.image} alt={idealreal.title} />
                        <p>{idealreal.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LNButton;