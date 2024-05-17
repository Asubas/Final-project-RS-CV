import './registartionPage.scss';
import '../accountPage/loginPage.scss';
// import '../../components/input/input'
import { useForm, SubmitHandler } from 'react-hook-form';
import MyButton from '../../components/button/button';
import MyInput from '../../components/input/input';
import validatePassword from '../accountPage/validatePassword';
import { useState } from 'react';
import SelectCountry from '../../components/selectCountry/selectCountry';
import AccordanceCountryToPostalCode from '../../components/accordanceCountryToPostalCode/accordanceCountryToPostalCode';
import dateCalculation from '../../components/dateCalculation/dateCalculation';
// import getAccesTokenRegistrationPage from '../../api/getAccesTokenRegistartionPage/getAccesTokenRegistrationPage';
import fetchCustomers from '../../api/BuildClient';

type Inputs = {
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  password: string;
  country: string;
  city: string;
  street: string;
  postalCode: string;
  dateOfBirth: string;
};

function RegistrationPage() {
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
  fetchCustomers();
  return (
    <div className="registration-field">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`registration-field_form registration-form ${isValid ? 'form-valid' : 'form-invalid'}`}
      >
        <fieldset className="registration-form_fieldset">
          <div className="registration-form_block">
            <legend className="registration-form_legend">Registartion</legend>

            <div className="registration-form_inputs-block">
              <div className="registration-form_first-name-input-container">
                <MyInput
                  className="registration__input registration-form_first-name-input"
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
              <SelectCountry />

              <div className="registration-form_city-input-container">
                <MyInput
                  className="registration__input registration-form_city-input"
                  type={'text'}
                  placeholder="City: "
                  {...register('city', {
                    required: 'This field must be completed',
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message:
                        'Must contain at least one latin character and no special characters or numbers',
                    },
                  })}
                  style={{
                    border: errors.city ? '1px solid red' : '',
                  }}
                />

                {errors.city && <span>{errors.city.message}</span>}
              </div>
              <div className="registration-form_street-input-container">
                <MyInput
                  className="registration__input registration-form_street-input"
                  type={'text'}
                  placeholder="Street: "
                  {...register('street', {
                    required: 'This field must be completed',
                    pattern: {
                      value: /.*[A-Za-z]+.*/,
                      message: 'Must contain at least one latin character',
                    },
                  })}
                  style={{
                    border: errors.street ? '1px solid red' : '',
                  }}
                />
                {errors.street && <span>{errors.street.message}</span>}
              </div>

              <div className="registration-form__input_date-of-birth-postal-code">
                <div className="registration-form_postal-code-input-container">
                  <MyInput
                    className="registration__input registration-form_postal-code-input"
                    type={'text'}
                    placeholder="Postal code: "
                    {...register('postalCode', {
                      required: 'This field must be completed',
                      validate: { AccordanceCountryToPostalCode },
                    })}
                    style={{
                      border: errors.postalCode ? '1px solid red' : '',
                    }}
                  />

                  {errors.postalCode && <span>{errors.postalCode.message}</span>}
                </div>
                <div className="registration-form_date-of-birth-input-container">
                  <MyInput
                    className="registration__input registration-form_date-of-birth-input"
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
            </div>

            <label className="registration-form_remember-Label" htmlFor="rem">
              {' '}
              Please remember me
              <MyInput className="registration-form_remember-Input" type="checkbox" id="rem" />
            </label>
            <MyButton className="btn_black " type="submit">
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
