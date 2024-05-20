import './registartionPage.scss';
import '../accountPage/loginPage.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import MyButton from '../../components/button/button';
import MyInput from '../../components/input/input';
import validatePassword from '../accountPage/validatePassword';
import { useState } from 'react';
import SelectCountry from '../../components/selectCountry/selectCountry';
import AccordanceCountryToPostalCode from '../../components/accordanceCountryToPostalCode/accordanceCountryToPostalCode';
import dateCalculation from '../../components/dateCalculation/dateCalculation';
import { Inputs } from '../../types/typeRegistrationPage';
import { registerCustomer } from '../../lib/userRegistartionFlow';

function RegistrationPage() {
  // localStorage.clear()
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const passwordEmpty = watch('password');
  const inputContainerPasswordName = `viewPassword ${passwordEmpty ? 'not-empty' : 'empty'}`;

  const [type, setType] = useState('');

  const showPassword = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };

  const [isCheckedShipping, setIsCheckedShipping] = useState(false);
  const [isCheckedBilling, setIsCheckedBilling] = useState(false);
  const [isCheckedSameAddresses, setIsCheckedSameAddresses] = useState(false);
  const handleCheckboxShippingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedShipping(event.target.checked);
    localStorage.setItem('setDefaultShippingAddress', String(event.target.checked));
  };

  const handleCheckboxBillingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedBilling(event.target.checked);
    localStorage.setItem('setDefaultBillingAddress', String(event.target.checked));
  };

  //   const handleCheckboxSameAddressesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setIsCheckedSameAddresses(event.target.checked);
  //     localStorage.setItem('setSameAddress', String(event.target.checked));
  //     const billingContainer = document.querySelector('.registration-form_billing-address-block') as HTMLElement;
  //     if(event.target.checked === true){

  //       const billingCityInput = (billingContainer.children[1].children[0] as HTMLInputElement).value =  localStorage.getItem('cityShipping') as string;
  //       const billingStreetInput =(billingContainer.children[2].children[0] as HTMLInputElement).value = localStorage.getItem('streetShipping') as string;
  //       const billingPostalCodeInput =(billingContainer.children[3].children[0] as HTMLInputElement).value = localStorage.getItem('postalCodeShipping') as string;

  //     } else {
  //       const billingCityInput = (billingContainer.children[1].children[0] as HTMLInputElement).removeAttribute('disabled');

  //       const billingStreetInput =(billingContainer.children[2].children[0] as HTMLInputElement).removeAttribute('disabled');

  //       const billingPosalCodeInput =(billingContainer.children[3].children[0] as HTMLInputElement).removeAttribute('disabled');
  //     }
  // };

  return (
    <div className="registration-field">
      <form
        onSubmit={handleSubmit(onSubmit)}
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
                  type={type}
                  placeholder="Enter your password"
                  {...register('password', {
                    required: 'This field must be completed',
                    validate: validatePassword,
                  })}
                  style={{
                    border: errors.password ? '1px solid red' : '',
                  }}
                />
                <span className={inputContainerPasswordName} onClick={showPassword}></span>
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

            {/* <label className="registration-form_remember-Label" htmlFor="rem">
              {' '}
              Also use as billind address
              <MyInput 
              className="registration-form_remember-Input" 
              type="checkbox" id="remSameAddresses"
              checked={isCheckedSameAddresses}
              onChange={handleCheckboxSameAddressesChange}
               />
            </label> */}
            <span className="error-message"></span>
            <MyButton className="btn_black " type="submit" onClick={registerCustomer}>
              {' '}
              Sign in
            </MyButton>
            <MyButton className="btn_black " type="submit">
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
