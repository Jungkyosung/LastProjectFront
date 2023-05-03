import axios from "axios";
import { useEffect, useState } from "react";
import { FaOdnoklassniki } from "react-icons/fa";


function Thumb() {
    const [count, setCount] = useState(0);
    const [ idealreal, setIdealreal ] = useState([])
    // const [like, setLike] = useState(0)
    const like = () => setCount(count + 1);

    useEffect(() => {
      axios.get(`http://localhost:8080/api/listidealreal`)
        .then(response => {
          setIdealreal(response.data.listIdealreal)
        })
        .catch(erorr => console.log(erorr))
    }, [])


    return (
      <>
        <button style={{ FaOdnoklassniki }} onClick={like}>좋NI {count}</button>
      </>
    );
  }
  
    export default Thumb;