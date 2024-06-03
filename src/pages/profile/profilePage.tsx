import { useEffect, useState } from 'react';
import './profilePage.scss';
import { client } from '../../lib/getUserById';
import { useNavigate } from 'react-router-dom';
import LoadingSnippet from '../../components/loadingSnippet/loadingSnippet';
// import ChangePasswordForm from './changePasswordForm';
import {
  Customer,
  createApiBuilderFromCtpClient,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { projectKey } from '../../lib/anonymFlow';
import { useForm } from 'react-hook-form';

function Profile() {
  const navigate = useNavigate();
  let [user, setUser] = useState<Customer | null>(null);
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [isEditable, setIsEditable] = useState({
    firstName: false,
    lastName: false,
    dateOfBirth: false,
  });
  const [changes, setChanges] = useState<CustomerUpdateAction[]>([]);

  if (!localStorage.getItem('userId')) {
    navigate('/');
  }

  const userId = localStorage.getItem('userId');
  if (!userId) {
    throw new Error('User ID is not available');
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await createApiBuilderFromCtpClient(client)
          .withProjectKey({ projectKey })
          .customers()
          .withId({ ID: userId })
          .get()
          .execute();
        user = res.body;
        setUser(user);

        setValue('firstName', user.firstName || '');
        setValue('lastName', user.lastName || '');
        setValue('dateOfBirth', user.dateOfBirth || '');
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [userId, setValue]);
  // }, 500);
  // };
  // },[]);

  // fetchUser();
  // }, []);

  const toggleEdit = (field: keyof typeof isEditable) => {
    setIsEditable((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  function getCustomerUpdateAction(field: string, value: any): CustomerUpdateAction | null {
    switch (field) {
      case 'firstName':
        return { action: 'setFirstName', firstName: value };
      case 'lastName':
        return { action: 'setLastName', lastName: value };
      case 'dateOfBirth':
        return { action: 'setDateOfBirth', dateOfBirth: value };
      default:
        return null;
    }
  }

  const onChange = (field: string, value: any) => {
    const updateAction = getCustomerUpdateAction(field, value);
    if (updateAction) {
      setChanges((prev) => {
        const existingIndex = prev.findIndex((action) => action.action === updateAction.action);
        if (existingIndex >= 0) {
          const updatedActions = [...prev];
          updatedActions[existingIndex] = updateAction;
          return updatedActions;
        } else {
          return [...prev, updateAction];
        }
      });
    }
  };

  const onSubmit = async () => {
    try {
      await createApiBuilderFromCtpClient(client)
        .withProjectKey({ projectKey })
        .customers()
        .withId({ ID: userId })
        .post({
          body: {
            version: user?.version ?? 0,
            actions: changes,
          },
        })
        .execute();
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (!user) {
    return <LoadingSnippet />;
  }

  const defaultBilAd = 'user.defaultBillingAddressId';
  const defaultShipAd = 'user.defaultShippingAddressId';

  return (
    <>
      <section className="profileSection">
        <div className="personalWrap">
          <h3 className="profileHead">Personal information</h3>
          <form className="personalForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="personal">
              <p className="personal_label">First name</p>
              <input
                className="personal_value"
                {...register('firstName')}
                disabled={!isEditable.firstName}
                onChange={(e) => onChange('firstName', e.target.value)}
              />
              <button type="button" onClick={() => toggleEdit('firstName')}>
                {isEditable.firstName ? '✔️ ' : '🖊️'}
              </button>
            </div>
            <div className="personal">
              <p className="personal_label">Last name</p>
              <input
                className="personal_value"
                {...register('lastName')}
                disabled={!isEditable.lastName}
                onChange={(e) => onChange('lastName', e.target.value)}
              />
              <button type="button" onClick={() => toggleEdit('lastName')}>
                {isEditable.lastName ? '✔️ ' : '🖊️'}
              </button>
            </div>
            <div className="personal">
              <p className="personal_label">Date of birth</p>
              <input
                className="personal_value"
                type="date"
                {...register('dateOfBirth')}
                disabled={!isEditable.dateOfBirth}
                onChange={(e) => onChange('dateOfBirth', e.target.value)}
              />
              <button type="button" onClick={() => toggleEdit('dateOfBirth')}>
                {isEditable.dateOfBirth ? '✔️ ' : '🖊️'}
              </button>
            </div>
            {Object.values(isEditable).some((editable) => editable) && (
              <button type="submit" className="btn_save btn_white">
                Save Changes
              </button>
            )}
          </form>
        </div>
        {/* <ChangePasswordForm /> */}
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
