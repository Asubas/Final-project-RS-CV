import { useEffect, useState } from 'react';
import './profile.scss';
import { getUserById } from '../../lib/getUserById';
import { useNavigate } from 'react-router-dom';
import { User } from '../../interfaces/customer';
import LoadingSnippet from '../../components/loadingSnippet/loadingSnippet';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  if (!localStorage.getItem('userId')) {
    navigate('/');
  }

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserById();
      setUser(userData);
    };

    fetchUser();
  }, []);

  if (!user) {
    return <LoadingSnippet />;
  }

  const defaultBilAd = user.defaultBillingAddressId;
  const defaultShipAd = user.defaultShippingAddressId;

  return (
    <>
      <section className="profileSection">
        <div className="personalWrap">
          <h3 className="profileHead">Personal information</h3>
          <div className="personal">
            <p className="personal_label">First name</p>
            <p className="personal_value">{user.firstName || 'no data :('}</p>
          </div>
          <div className="personal">
            <p className="personal_label">Last name</p>
            <p className="personal_value">{user.lastName || 'no data :('}</p>
          </div>
          <div className="personal">
            <p className="personal_label">e-mail</p>
            <p className="personal_value">{user.email || 'no data :('}</p>
          </div>
          <div className="personal">
            <p className="personal_label">Date of birth</p>
            <p className="personal_value">{user.dateOfBirth || 'no data :('}</p>
          </div>
        </div>
        <div className="addressesWrap">
          <h3 className="profileHead">addresses</h3>
          {user.addresses && user.addresses.length > 0 ? (
            user.addresses.map((address) => (
              <div key={address.id} className="address" data-id={address.id}>
                {address.id === defaultBilAd && (
                  <span className="default_address">Default billing address</span>
                )}
                {address.id === defaultShipAd && (
                  <span className="default_address">Default shipping address</span>
                )}
                <div className="address_line">
                  <p className="address_label">Country:</p>
                  <span className="address_value">{address.country}</span>
                </div>
                <div className="address_line">
                  <p className="address_label">City:</p>
                  <span className="address_value">{address.city}</span>
                </div>
                <div className="address_line">
                  <p className="address_label">Street:</p>
                  <span className="address_value">{address.streetName}</span>
                </div>
                <div className="address_line">
                  <p className="address_label">Postal Code:</p>
                  <span className="address_value">{address.postalCode}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="noAddress">Something wrong, can not see any address :(</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Profile;
