import { Link } from 'react-router-dom';
import './myBag.scss';
import emptyCartImg from '../../assets/img/empty-cart.png';

function EmptyBag() {
  return (
    <div className="emptyBagWrap">
      <img src={emptyCartImg} alt="cart is empty" className="emptyCartImg" />
      <p className="emptyBagMsg">Looks like you haven't chosen anything yet</p>
      <Link className="emptyBagLink" to="/collection">
        Go back to store
      </Link>
    </div>
  );
}

export default EmptyBag;
