import './Koreaprice.css';
import Frame from "../main/Frame";
import KoreapriceEachItem from './KoreapriceEachItem';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

const Koreaprice = () => {

  const items = [1, 2, 3, 4, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Frame>
      <div id="koreaprice-img">
        <img src="https://t2.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/bkmN/image/86lbHcV9oRWUv0Gn0Y-FLPJycbw"/>
      </div>
      <div id="koreaprice-wrap">
        <p id="koreaprice-title">물가체험</p>
        <div id="koreaprice-price-window">
          <div id="koreaprice-cart">
            <div id="koreaprice-cart-coltitle">
              <span className='koreaprice-cart-coltitle-1'>상품명</span>
              <span className='koreaprice-cart-coltitle-2'>수량</span>
              <span className='koreaprice-cart-coltitle-3'>단가</span>
              <span className='koreaprice-cart-coltitle-4'>금액</span>
            </div>
            <div className='koreaprice-cart-col-products'>

              <span className='koreaprice-cart-1'>상품명</span>
              <span className='koreaprice-cart-2'>수량</span>
              <span className='koreaprice-cart-3'>단가</span>
              <span className='koreaprice-cart-4'>금액</span>
              <span className='koreaprice-cart-5'>
                <DisabledByDefaultIcon />
              </span>
            </div>
          </div>
          <div id="koreaprice-exchange">
            <div id="koreaprice-exchange-won">WON</div>
            <div>YOUR</div>
          </div>
        </div>
        <div id="koreaprice-items-list">
          {items.map((item) => {
            return (
              <KoreapriceEachItem item={item} />)
          })}
        </div>
      </div>
    </Frame>
  )
}
export default Koreaprice;