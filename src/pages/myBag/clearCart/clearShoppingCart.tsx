import './clearShoppingCart.scss';
import { useState } from 'react';
import { countRef } from '../../../components/header/navBar/navBar';
import { startApp } from '../../../lib/authorization/callAnonymFlow';
import { projectKey } from '../../../lib/exports/exportsContants';
import { checkUser } from '../../../lib/flow/anonymFlow';
import { getCart } from '../../../lib/flow/getCart';
import { useNavigate } from 'react-router-dom';

const ClearShoppingCart = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    setShowModal(false);
    getCart().then((res) => {
      if (res.statusCode === 200) {
        checkUser()
          .withProjectKey({ projectKey })
          .me()
          .carts()
          .withId({ ID: res.body.id })
          .delete({ queryArgs: { version: res.body.version } })
          .execute()
          .then((response) => {
            if (response.statusCode === 200) {
              localStorage.removeItem('anonymousCartId');
              if (countRef.current?.textContent) {
                countRef.current.textContent = '';
                countRef.current.classList.add('empty');
              }
              startApp();
              navigate('/collection');
            }
          });
      }
    });
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <button className="btn_black backToShop" onClick={() => setShowModal(true)}>
        Clear Shopping Cart
      </button>
      {showModal && (
        <div className={`modal ${showModal ? 'show' : ''}`}>
          <div className="modal-content">
            <h2>Are you sure you want to clear your shopping cart?</h2>
            <div className="modal-actions">
              <button className="btn_black" onClick={handleConfirm}>
                Confirm
              </button>
              <button className="btn_black" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { ClearShoppingCart };
