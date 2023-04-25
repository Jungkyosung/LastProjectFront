import { useState } from "react";
import { FaOdnoklassniki } from "react-icons/fa";

function Thumb() {
    const [count, setCount] = useState(0);
    const like = () => setCount(count + 1);
    return (
      <>
        <button style={{ FaOdnoklassniki }} onClick={like}>좋NI {count}</button>
      </>
    );
  }
  
    export default Thumb;