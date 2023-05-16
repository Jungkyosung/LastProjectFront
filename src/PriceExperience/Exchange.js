import { useEffect, useState } from "react";
import axios from "axios";

const Exchange = (props) => {
  let jwtToken = null;
  if (sessionStorage.getItem("token") != null) {
    jwtToken = sessionStorage.getItem("token");
  }

  const header = {
    Authorization: `Bearer ${jwtToken}`,
  };

  // Info priceTotal{nameAndPrice.price * count} props
  const priceTotal = props.priceTotal;

  // const {priceTotal} = parseFloat(props);
  console.log(typeof priceTotal, priceTotal);

  const [exchangeList, setExchageList] = useState([]);
  const [selectExchange, setSelectExchange] = useState("");
  const [totalExchange, setTotalExchange] = useState(0);

  useEffect(() => {
    axios
      .get(`http://192.168.0.39:8080/api/exchangeList`, { headers: header })
      .then((response) => {
        console.log(response.data);
        let rsp = response.data;
        for (let i = 0; i < rsp.length; i++) {
          rsp[i] = { ...rsp[i] };
        }
        console.log(rsp);
        setExchageList(rsp);
      })
      .catch((error) => console.log(error));
  }, []);

  // 환율 IDR(100), JPY(100) 변환
  const handlerSelect = (e) => {
    setSelectExchange(e.target.value);
    console.log(e.target.value);
    let arrExchange = exchangeList.filter(
      (array) => array.exchangeNationShort == e.target.value
    );
    if (arrExchange[0].exchangeIdx == 12 || arrExchange[0].exchangeIdx == 13) {
      setTotalExchange(parseFloat(arrExchange[0].exchangeRate / 100));
    } else {
      setTotalExchange(parseFloat(arrExchange[0].exchangeRate));
    }
  };

  return (
    <div className="Experience__ExchangeBox">
      <div className="Experience__Input">
        {/* 환율 셀렉 박스 */}
        <select onChange={(e) => handlerSelect(e)} value={selectExchange}>
          <option value="" disabled selected>
            국적을 선택하세요
          </option>
          {exchangeList.map((ex) => (
            <option value={ex.exchangeNationShort} key={ex.exchangeIdx}>
              {ex.exchangeNationShort}
            </option>
          ))}
        </select>
      </div>

      {/* 원화 총 금액 표시 */}
      <div className="Experience__ExchangeKR">
        <p>원화 총 금액</p>
        <ul>
          {!isNaN(priceTotal) &&
            priceTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "won"}
        </ul>
      </div>

      {/* 환율 변환 총 금액 */}
      <div className="Experience__ExchangeOther">
        <ul>
          {!isNaN(priceTotal / totalExchange) &&
            isFinite(priceTotal / totalExchange) &&
            (priceTotal / totalExchange)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          총 금액{" "}
        </ul>
      </div>
    </div>
  );
};
export default Exchange;
