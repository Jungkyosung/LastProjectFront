import { useState } from "react";
import Exchange from "./Exchange";

const Info = (props) => {
  // PriceExperiencePage Props
  const { nameAndPrice } = props;
  const { setNameAndPrice } = props;

  // Count //
  const [count, setCount] = useState(0);

  const plusOne = (cnt, index) => {
    let 복사본 = [...nameAndPrice];
    console.log(복사본);
    console.log(cnt);
    console.log(index);
    복사본[index].count = cnt + 1;
    setNameAndPrice(복사본);
  };

  const minusOne = (cnt, index) => {
    let 복사본 = [...nameAndPrice];
    console.log(복사본);
    console.log(cnt);
    console.log(index);
    if (cnt == 0) {
    } else {
      복사본[index].count = cnt - 1;
      setNameAndPrice(복사본);
    }
  };

  // List 삭제 //
  const clickDelete = (index) => {
    const 복사본 = nameAndPrice.filter((_, i) => i !== index);
    if (복사본.length === 0) {
      setNameAndPrice([{ price: 0 }]); // 배열이 비어있는 경우 빈 배열로 업데이트
    } else {
      setNameAndPrice(복사본);
    }
  };

  const [priceTotal, setPriceTotal] = useState(0);
  let sum = nameAndPrice.reduce((accumulator, nap) => {
    return accumulator + nap.price * nap.count;
  }, 0);

  function 소수점표시(숫자) {
    return 숫자.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      {/* Exchange props */}
      <div className="Experience__container2">
        <Exchange priceTotal={sum} />
      </div>

      <div className="Experience__Info">
        <div className="Experience__Info__top">
          <ul>선택상품명</ul>
          <ul>count</ul>
          <ul>단위</ul>
          <ul>단가</ul>
          <ul>금액</ul>
        </div>
        {nameAndPrice[0].price != 0 ? (
          <div className="Experience__Info__bottom">
            {nameAndPrice.map((nameAndPrice, index) => (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <ul>
                  <button onClick={() => clickDelete(index)}>삭제</button>
                </ul>
                <ul>{nameAndPrice.name}</ul>
                <div className="Experience__Info__bottom__button">
                  <ul>{nameAndPrice.count}</ul>
                  <ul>
                    <button onClick={() => plusOne(nameAndPrice.count, index)}>
                      ∧
                    </button>
                  </ul>
                  <ul>
                    <button onClick={() => minusOne(nameAndPrice.count, index)}>
                      ∨
                    </button>
                  </ul>
                </div>
                <ul>{nameAndPrice.capacity}</ul>
                <ul>{소수점표시(nameAndPrice.price)}</ul>
                <ul>{소수점표시(nameAndPrice.price * nameAndPrice.count)}</ul>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Info;
