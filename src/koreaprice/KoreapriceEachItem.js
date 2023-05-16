import './KoreapriceEachItem.css';

const KoreapriceEachItem = (props) => {

  const item = props.item;

  return (
    <div className="koreaprice-item-wrap">
      <div className="koreaprice-item-pic">
        사진{item}
      </div>
      <div className="koreaprice-item-info">
        상품정보{item}
      </div>
    </div>
  )
}
export default KoreapriceEachItem;