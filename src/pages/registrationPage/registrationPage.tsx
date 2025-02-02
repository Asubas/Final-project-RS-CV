import './registartionPage.scss';
import '../accountPage/loginPage.scss';
import { useForm } from 'react-hook-form';
import MyButton from '../../components/button/button';
import MyInput from '../../components/input/input';
import validatePassword from '../accountPage/validatePassword';
import SelectCountry from '../../components/selectCountry/selectCountry';
import dateCalculation from '../../components/dateCalculation/dateCalculation';
import { Inputs } from '../../types/typeRegistrationPage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import validatePostalCode from '../../components/accordanceCountryToPostalCode/accordanceCountryToPostalCode';
import { registerUser } from '../../lib/resquests/registerUser';

function RegistrationPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: 'onChange' });
  const submitForm = async () => {
    if (isValid) {
      registerUser(navigate);
    }
  };
  const navigateToLogin = () => navigate('/login');
  const [isSecondSelectDisabled, setIsSecondSelectDisabled] = useState<boolean>(false);
  const [isCheckedShipping, setIsCheckedShipping] = useState(false);
  const [isCheckedBilling, setIsCheckedBilling] = useState(false);
  const [isCheckedSameAddress, setIsCheckedSameAddress] = useState(false);
  const [isDisabledCityBilling, setIsDisabledCityBilling] = useState(false);
  const [isDisabledStreetBilling, setIsDisabledStreetBilling] = useState(false);
  const [isDisabledPostalCodeBilling, setIsDisabledPostalCodeBilling] = useState(false);

  const handleCheckboxShippingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedShipping(event.target.checked);
    localStorage.setItem('setDefaultShippingAddress', String(event.target.checked));
  };

  const handleCheckboxBillingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedBilling(event.target.checked);
    localStorage.setItem('setDefaultBillingAddress', String(event.target.checked));
  };

  const handleCheckboxSameAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedSameAddress(event.target.checked);
    localStorage.setItem('setSameAddress', String(event.target.checked));

    if (event.target.checked === true) {
      setIsDisabledCityBilling(true);
      setIsDisabledStreetBilling(true);
      setIsDisabledPostalCodeBilling(true);
      setIsSecondSelectDisabled(true);
    } else {
      setIsDisabledCityBilling(false);
      setIsDisabledStreetBilling(false);
      setIsDisabledPostalCodeBilling(false);
      setIsSecondSelectDisabled(false);
    }
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
                  onChange={dateCalculation}
                  maxLength={10}
                />
                <span id="error"></span>
                {errors.dateOfBirth && <span>{errors.dateOfBirth.message}</span>}
              </div>
            </div>
            <h3>Shipping Address</h3>
            <div className="registration-form_shipping-address-block">
              <SelectCountry isDisabled={false} />
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
                    validate: validatePostalCode(localStorage.getItem('patternShipping') as string),
                  })}
                  style={{
                    border: errors.postalCodeShipping ? '1px solid red' : '',
                  }}
                />
                <span></span>
                {errors.postalCodeShipping && <span>{errors.postalCodeShipping.message}</span>}
              </div>
            </div>

            <div className="labels-block">
              <label
                className="registration-form_defaultAddress-Label"
                htmlFor="remShippingAddress"
              >
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

              <label
                className="registration-form_defaultAddress-Label disableThisSelector"
                htmlFor="remSameAddress"
              >
                {' '}
                Use as billing address
                <MyInput
                  className="registration-form_defaultAddress-Input disableThisSelector"
                  autoComplete="current-password"
                  type="checkbox"
                  name="sameAddress"
                  id="remSameAddress"
                  checked={isCheckedSameAddress}
                  onChange={handleCheckboxSameAddressChange}
                />
              </label>
            </div>

            <h3>Billing Address</h3>
            <div className="registration-form_billing-address-block">
              <SelectCountry isDisabled={isSecondSelectDisabled} />
              <div className="registration-form_city-input-container">
                <MyInput
                  className="registration__input registration-form_city-input"
                  autoComplete="current-password"
                  type={'text'}
                  placeholder="City: "
                  {...register(
                    'cityBilling',
                    isDisabledCityBilling
                      ? {}
                      : {
                          required: 'This field must be completed',
                          pattern: {
                            value: /^[a-zA-Z]+$/,
                            message:
                              'Must contain at least one latin character and no special characters or numbers',
                          },
                        },
                  )}
                  style={{
                    border: !isDisabledCityBilling && errors.cityBilling ? '1px solid red' : '',
                  }}
                  disabled={isDisabledCityBilling}
                />
                {!isDisabledCityBilling && errors.cityBilling && (
                  <span>{errors.cityBilling.message}</span>
                )}
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
                    border: !isDisabledStreetBilling && errors.streetBilling ? '1px solid red' : '',
                  }}
                  disabled={isDisabledStreetBilling}
                />
                {!isDisabledStreetBilling && errors.streetBilling && (
                  <span>{errors.streetBilling.message}</span>
                )}
              </div>
              <div className="registration-form_postal-code-input-container">
                <MyInput
                  className="registration__input registration-form_postal-code-input"
                  autoComplete="current-password"
                  type={'text'}
                  placeholder="Postal code: "
                  {...register('postalCodeBilling', {
                    required: 'This field must be completed',
                    validate: validatePostalCode(localStorage.getItem('patternBilling') as string),
                  })}
                  style={{
                    border:
                      !isDisabledPostalCodeBilling && errors.postalCodeBilling
                        ? '1px solid red'
                        : '',
                  }}
                  disabled={isDisabledPostalCodeBilling}
                />
                <span></span>
                {!isDisabledPostalCodeBilling && errors.postalCodeBilling && (
                  <span>{errors.postalCodeBilling.message}</span>
                )}
              </div>
            </div>

            <div className="labels-block">
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
            </div>

            <MyButton className="btn_white " type="submit">
              {' '}
              Sign up
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
