import { useEffect, useState } from 'react';
import './profilePage.scss';
import { client } from '../../lib/resquests/getUserById';
import { useNavigate } from 'react-router-dom';
import LoadingSnippet from '../../components/loadingSnippet/loadingSnippet';
// import ChangePasswordForm from './changePasswordForm';
import {
  Customer,
  createApiBuilderFromCtpClient,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { useForm } from 'react-hook-form';
import { projectKey } from '../../lib/exports/exportsContants';
function Profile() {
  const navigate = useNavigate();
  let [user, setUser] = useState<Customer | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm();
  const [isEditable, setIsEditable] = useState({
    firstName: false,
    lastName: false,
    dateOfBirth: false,
    email: false,
  });
  const [changes, setChanges] = useState<CustomerUpdateAction[]>([]);

  if (!localStorage.getItem('userId')) {
    navigate('/');
  }

  const userId = localStorage.getItem('userId');
  if (!userId) {
    throw new Error('User ID is not available');
  }

  // получение customer для рендера
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
        setValue('email', user.email || '');
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [userId, setValue]);

  const toggleEdit = (field: keyof typeof isEditable) => {
    setIsEditable((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // проверка полей изменений для объекта с изменениями
  function getCustomerUpdateAction(field: string, value: string): CustomerUpdateAction | null {
    switch (field) {
      case 'firstName':
        return { action: 'setFirstName', firstName: value };
      case 'lastName':
        return { action: 'setLastName', lastName: value };
      case 'dateOfBirth':
        return { action: 'setDateOfBirth', dateOfBirth: value };
      case 'email':
        return { action: 'changeEmail', email: value };
      default:
        return null;
    }
  }

  // собираем объект изменений для отправки
  const onChange = (field: string, value: string) => {
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

  // проверка возраста
  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  };

  // отправка изменений
  // попутно мы обновляем user для доступа текущей версии
  const onSubmit = async () => {
    if (!user) return;

    if (isValid) {
      try {
        const res = await createApiBuilderFromCtpClient(client)
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

        const updatedUser = res.body;
        setUser(updatedUser); // обновление
        setChanges([]);
        setIsEditable({
          firstName: false,
          lastName: false,
          dateOfBirth: false,
          email: false,
        });
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

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
          <form className="personalForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="personal">
              <p className="personal_label">First name</p>
              <div className="personal_cont">
                <input
                  className="personal_value"
                  {...register('firstName', {
                    required: 'This field must be completed',
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: 'Invalid format. Please write in Latin letters',
                    },
                  })}
                  disabled={!isEditable.firstName}
                  onChange={(e) => onChange('firstName', e.target.value)}
                />
                {errors.firstName && (
                  <p className="input_error_message">{errors.firstName.message as string}</p>
                )}
              </div>
              <button type="button" onClick={() => toggleEdit('firstName')}>
                {isEditable.firstName ? '✔️ ' : '🖊️'}
              </button>
            </div>
            <div className="personal">
              <p className="personal_label">Last name</p>
              <div className="personal_cont">
                <input
                  className="personal_value"
                  {...register('lastName', {
                    required: 'This field must be completed',
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: 'Invalid format. Please write in Latin letters',
                    },
                  })}
                  disabled={!isEditable.lastName}
                  onChange={(e) => onChange('lastName', e.target.value)}
                />
                {errors.lastName && (
                  <p className="input_error_message">{errors.lastName.message as string}</p>
                )}
              </div>
              <button type="button" onClick={() => toggleEdit('lastName')}>
                {isEditable.lastName ? '✔️ ' : '🖊️'}
              </button>
            </div>
            <div className="personal">
              <p className="personal_label">email</p>
              <div className="personal_cont">
                <input
                  className="personal_value"
                  {...register('email', {
                    required: 'This field must be completed',
                    pattern: {
                      value: /^\S+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: 'Please write an email in the format user@example.com/ru',
                    },
                  })}
                  disabled={!isEditable.email}
                  onChange={(e) => onChange('email', e.target.value)}
                />
                {errors.email && (
                  <p className="input_error_message">{errors.email.message as string}</p>
                )}
              </div>
              <button type="button" onClick={() => toggleEdit('email')}>
                {isEditable.email ? '✔️ ' : '🖊️'}
              </button>
            </div>
            <div className="personal">
              <p className="personal_label">Date of birth</p>
              <div className="personal_cont">
                <input
                  className="personal_value"
                  type="date"
                  {...register('dateOfBirth', {
                    required: 'This field must be completed',
                    validate: (value) => {
                      const age = calculateAge(value);
                      return age >= 16 || 'You must be at least 16 years old';
                    },
                  })}
                  disabled={!isEditable.dateOfBirth}
                  onChange={(e) => onChange('dateOfBirth', e.target.value)}
                />
                {errors.dateOfBirth && (
                  <p className="input_error_message">{errors.dateOfBirth.message as string}</p>
                )}
              </div>
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
