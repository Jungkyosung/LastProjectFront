import { useEffect, useState } from "react";
import Info from "./Info";
import Exchange from "./Exchange";
import "./PriceExperiencePage.css";
import axios from "axios";
import apple from "./img/apple.jpg";
import onion from "./img/onion.jpg";
import garlic from "./img/garlic.jpg";
import salt from "./img/salt.jpg";
import rice from "./img/rice.jpg";
import egg from "./img/egg.jpg";
import chicken from "./img/chicken.jpg";
import pork from "./img/pork.jpg";
import beef from "./img/beef.jpg";
import cheese from "./img/cheese.jpg";


const PriceExperiencePage = () => {

  let jwtToken = null;
    if (sessionStorage.getItem('token') != null) {
        jwtToken = sessionStorage.getItem('token');
    }
  
    const header = {
        'Authorization': `Bearer ${jwtToken}`
    };

  const imgArray = [ apple, garlic, onion, salt, rice, egg, chicken, pork, beef, cheese];
  
  const [productLists, setProductLists] = useState([]);
    
    useEffect( () => {
      axios.get(`http://192.168.0.39:8080/api/koreaprice`, {headers : header})
      .then((response)=> {
        console.log(response.data);
        let rsp = response.data;
        for (let i = 0 ; i < rsp.length ; i ++){
          rsp[i] = {...rsp[i], img : imgArray[i]}
        }
        console.log(rsp);
        setProductLists(rsp);
      })
      .catch(error=>console.log(error));
    },[]);


  const [nameAndPrice, setNameAndPrice] = useState([]);
  
  const handlerSetNameAndPrice = (name, price, capacity) => {
    setNameAndPrice([ {name, price, capacity } ]);
  };



  return (
    <>
      <nav>
        <p>123</p>
      </nav>
       
      <main>
        
        <div className="Experience__container">
            <Info nameAndPrice={nameAndPrice} />
        </div>

        <div className="Experience__product">
          {productLists.map((p) => {
            return (
              <>
                <div key={p.koreapriceIdx} className="Experience__product__image">
                  <img
                    src={p.img}
                    style={{ width: 100, height: 100 }}
                    onClick={() =>
                      handlerSetNameAndPrice(p.koreapriceProduct, p.koreapricePrice, p.koreapriceCapacity)
                    }
                  />
                  <p>{p.koreapriceProduct}</p>
                </div>
              </>
            );
          })}
        </div>
        
      </main>

      <footer>
        <p>123</p>
      </footer>
    </>
  );
};
export default PriceExperiencePage;
