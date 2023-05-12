import { useState } from "react";
import Exchange from "./Exchange";

const Info = (props) => {


  // PriceExperiencePage Props
  const { nameAndPrice } = props;


  // Count
  const [count, setCount] = useState(0);


  const plusOne = () => {
    setCount((preNum) => preNum + 1);
  }
  const minusOne = () => {
    setCount((preNum) => (preNum <= 0 ? 0 : preNum - 1));
  };

  

  // priceTotal = {nameAndPrice.price * count}
  const [priceTotal, setPriceTotal] = useState(0);

  console.log(nameAndPrice);
  // console.log(nameAndPrice[0].price);
  console.log(priceTotal);
  // console.log( typeof(nameAndPrice.price * count), (nameAndPrice[0].price * count));

  


  return (
    <>
    {/* Exchange props */}
    <div className="Experience__container2">
        {/* <Exchange priceTotal={(nameAndPrice[0].price * count)}/> */}
        <Exchange priceTotal={(nameAndPrice.price * count)}/>
    </div>

    <div className="Experience__Info">
      <div className="Experience__Info__top">
        <ul>선택상품명</ul>
        <ul>count</ul>
        <ul>단위</ul>
        <ul>금액</ul>
      </div>


      <div className="Experience__Info__bottom">
          {nameAndPrice.map((nameAndPrice) => (
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between"}}>
                <ul>{nameAndPrice.name}</ul>
              <div className="Experience__Info__bottom__button">
                <ul>{count}</ul>
                <ul><button onClick={plusOne}>∧</button></ul>
                <ul><button onClick={minusOne}>∨</button></ul>
              </div>  
                <ul>{nameAndPrice.capacity}</ul>
                <ul> {nameAndPrice.price* count}</ul>
            </div>
          ))}
          
      </div>
    </div>
   </>
  );
};

export default Info;
