import './registartionPage.scss';
import '../accountPage/loginPage.scss';
import { useForm } from 'react-hook-form';
import MyButton from '../../components/button/button';
import MyInput from '../../components/input/input';
import validatePassword from '../accountPage/validatePassword';
import SelectCountry from '../../components/selectCountry/selectCountry';
import AccordanceCountryToPostalCode from '../../components/accordanceCountryToPostalCode/accordanceCountryToPostalCode';
import dateCalculation from '../../components/dateCalculation/dateCalculation';
import { Inputs } from '../../types/typeRegistrationPage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRef } from '../../components/header/navBar/navBar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import registerCustomer from '../../lib/userRegistartionFlow';
import { errorRegister, successRegister } from '../../components/toastyOption/toastyOptions';
function RegistrationPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: 'onChange' });
  const submitForm = async () => {
    await registerCustomer()
      .then((res) => {
        if (res === null) {
          toast.error(
            'Registration error. Perhaps a user with this email already exists!',
            errorRegister,
          );
          return;
        } else if (res && res !== null) {
          const emailUser = localStorage.getItem('email');
          if (emailUser) localStorage.setItem('userId', emailUser);
          navigate('/');
          if (loginRef.current) loginRef.current.textContent = 'Log out';
          toast.success('🔥 You have successfully registered and logged in!', successRegister);
        }

        const keyToKeep = 'userId';
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
          if (key !== keyToKeep) {
            localStorage.removeItem(key);
          }
        });
      })
      .catch(() => {
        toast.error(
          'Registration error. Perhaps a user with this email already exists!',
          errorRegister,
        );
      });
  };

  // const navigate = useNavigate();
  const navigateToLogin = () => navigate('/login');
  const [isCheckedShipping, setIsCheckedShipping] = useState(false);
  const [isCheckedBilling, setIsCheckedBilling] = useState(false);
  const handleCheckboxShippingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedShipping(event.target.checked);
    localStorage.setItem('setDefaultShippingAddress', String(event.target.checked));
  };

  const handleCheckboxBillingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedBilling(event.target.checked);
    localStorage.setItem('setDefaultBillingAddress', String(event.target.checked));
  };
  return (
    <div className="registration-field">
      <form
        onSubmit={handleSubmit(submitForm)}
        className={`registration-field_form registration-form ${isValid ? 'form-valid' : 'form-invalid'}`}
      >
        <fieldset className="registration-form_fieldset">
          <div className="registration-form_block">
            <legend className="registration-form_legend">Registartion</legend>

            <div className="registration-form_user-data-block">
              <div className="registration-form_first-name-input-container">
                <MyInput
                  className="registration__input registration-form_first-name-input"
                  autoComplete="current-password"
                  type="text"
                  placeholder="First name: "
                  {...register('firstName', {
                    required: 'This field must be completed',
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message:
                        'Invalid format. First name must contain at least one latin character and no special characters or numbers',
                    },
                  })}
                  style={{
                    border: errors.firstName ? '1px solid red' : '',
                  }}
                />
                {errors.firstName && <span>{errors.firstName.message}</span>}
              </div>
              <div className="registration-form_last-name-input-container">
                <MyInput
                  className="registration__input registration-form_last-name-input"
                  autoComplete="current-password"
                  type="text"
                  placeholder="Last name: "
                  {...register('lastName', {
                    required: 'This field must be completed',
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message:
                        'Invalid format. Last name must contain at least one latin character and no special characters or numbers',
                    },
                  })}
                  style={{
                    border: errors.lastName ? '1px solid red' : '',
                  }}
                />
                {errors.lastName && <span>{errors.lastName.message}</span>}
              </div>
              <div className="registration-form_email-input-container">
                <MyInput
                  className="registration__input registration-form_email-input"
                  autoComplete="current-password"
                  type="email"
                  placeholder="Email Address"
                  {...register('email', {
                    required: 'This field must be completed',
                    pattern: {
                      value: /^\S+@([\w-]+\.)+[\w-]{2,4}$/,
                      message:
                        'Invalid email format. Please write an email in the format user@example.com/ru',
                    },
                  })}
                  style={{
                    border: errors.email ? '1px solid red' : '',
                  }}
                />
                {errors.email && <span>{errors.email.message}</span>}
              </div>
              <div className="registration-form_password-input-container">
                <MyInput
                  className="registration__input registration-form_password-input"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  {...register('password', {
                    required: 'This field must be completed',
                    validate: validatePassword,
                  })}
                  style={{
                    border: errors.password ? '1px solid red' : '',
                  }}
                />
                {errors.password && <span>{errors.password.message}</span>}
              </div>

              <div className="registration-form_date-of-birth-input-container">
                <MyInput
                  className="registration__input registration-form_date-of-birth-input"
                  autoComplete="current-password"
                  type={'date'}
                  {...register('dateOfBirth', {
                    required: 'This field must be completed',
                  })}
                  required={true}
                  onChange={dateCalculation}
                  maxLength={10}
                />
                <span id="error"></span>
                {errors.dateOfBirth && <span>{errors.dateOfBirth.message}</span>}
              </div>
            </div>
            <h3>Shipping Address</h3>
            <div className="registration-form_shipping-address-block">
              <SelectCountry />
              <div className="registration-form_city-input-container">
                <MyInput
                  className="registration__input registration-form_city-input"
                  autoComplete="current-password"
                  type={'text'}
                  placeholder="City: "
                  {...register('cityShipping', {
                    required: 'This field must be completed',
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message:
                        'Must contain at least one latin character and no special characters or numbers',
                    },
                  })}
                  style={{
                    border: errors.cityShipping ? '1px solid red' : '',
                  }}
                />
                {errors.cityShipping && <span>{errors.cityShipping.message}</span>}
              </div>
              <div className="registration-form_street-input-container">
                <MyInput
                  className="registration__input registration-form_street-input"
                  autoComplete="current-password"
                  type={'text'}
                  placeholder="Street: "
                  {...register('streetShipping', {
                    required: 'This field must be completed',
                    pattern: {
                      value: /.*[A-Za-z]+.*/,
                      message: 'Must contain at least one latin character',
                    },
                  })}
                  style={{
                    border: errors.streetShipping ? '1px solid red' : '',
                  }}
                />
                {errors.streetShipping && <span>{errors.streetShipping.message}</span>}
              </div>
              <div className="registration-form_postal-code-input-container">
                <MyInput
                  className="registration__input registration-form_postal-code-input"
                  autoComplete="current-password"
                  type={'text'}
                  placeholder="Postal code: "
                  {...register('postalCodeShipping', {
                    required: 'This field must be completed',
                    validate: { AccordanceCountryToPostalCode },
                  })}
                  style={{
                    border: errors.postalCodeShipping ? '1px solid red' : '',
                  }}
                />
                <span></span>
                {errors.postalCodeShipping && <span>{errors.postalCodeShipping.message}</span>}
              </div>
            </div>

            <label className="registration-form_defaultAddress-Label" htmlFor="remShippingAddress">
              {' '}
              Set as default shipping address
              <MyInput
                className="registration-form_defaultAddress-Input"
                autoComplete="current-password"
                name="shipping"
                type="checkbox"
                id="remShippingAddress"
                checked={isCheckedShipping}
                onChange={handleCheckboxShippingChange}
              />
            </label>

            <h3>Billing Address</h3>
            <div className="registration-form_billing-address-block">
              <SelectCountry />
              <div className="registration-form_city-input-container">
                <MyInput
                  className="registration__input registration-form_city-input"
                  autoComplete="current-password"
                  type={'text'}
                  placeholder="City: "
                  {...register('cityBilling', {
                    required: 'This field must be completed',
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message:
                        'Must contain at least one latin character and no special characters or numbers',
                    },
                  })}
                  style={{
                    border: errors.cityBilling ? '1px solid red' : '',
                  }}
                />
                {errors.cityBilling && <span>{errors.cityBilling.message}</span>}
              </div>
              <div className="registration-form_street-input-container">
                <MyInput
                  className="registration__input registration-form_street-input"
                  autoComplete="current-password"
                  type={'text'}
                  placeholder="Street: "
                  {...register('streetBilling', {
                    required: 'This field must be completed',
                    pattern: {
                      value: /.*[A-Za-z]+.*/,
                      message: 'Must contain at least one latin character',
                    },
                  })}
                  style={{
                    border: errors.streetBilling ? '1px solid red' : '',
                  }}
                />
                {errors.streetBilling && <span>{errors.streetBilling.message}</span>}
              </div>
              <div className="registration-form_postal-code-input-container">
                <MyInput
                  className="registration__input registration-form_postal-code-input"
                  autoComplete="current-password"
                  type={'text'}
                  placeholder="Postal code: "
                  {...register('postalCodeBilling', {
                    required: 'This field must be completed',
                    validate: { AccordanceCountryToPostalCode },
                  })}
                  style={{
                    border: errors.postalCodeBilling ? '1px solid red' : '',
                  }}
                />
                <span></span>
                {errors.postalCodeBilling && <span>{errors.postalCodeBilling.message}</span>}
              </div>
            </div>

            <label className="registration-form_defaultAddress-Label" htmlFor="remBillingAddress">
              {' '}
              Set as default billing address
              <MyInput
                className="registration-form_defaultAddress-Input"
                autoComplete="current-password"
                type="checkbox"
                name="billing"
                id="remBillingAddress"
                checked={isCheckedBilling}
                onChange={handleCheckboxBillingChange}
              />
            </label>
            <span className="error-message"></span>
            <MyButton className="btn_white " type="submit" onClick={submitForm}>
              {' '}
              Sign in
            </MyButton>
            <MyButton className="btn_black " type="button" onClick={navigateToLogin}>
              {' '}
              Back to Login page
            </MyButton>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default RegistrationPage;
