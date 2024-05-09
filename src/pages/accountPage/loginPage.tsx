import './loginPage.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import MyButton from '../../components/button/button';
import MyInput from '../../components/input/input';
import validatePassword from './validatePassword';
import { useState } from 'react';

type Inputs = {
  login: string;
  password: string;
};

function AccountPage() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const passwordEmpty = watch('password');
  const inputContainerPasswordName = `viewPassword ${passwordEmpty ? 'not-empty' : 'empty'}`;

  const [type, setType] = useState('password');

  const showPassword = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };
  return (
    <div className="authorization-field">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`authorization-field_form login-form ${isValid ? 'form-valid' : 'form-invalid'}`}
      >
        <fieldset className="login-form_fieldset">
          <legend className="login-form_legend">Already a customer?</legend>
          <label className="login-form_label">Welcome back! Sign in for faster checkout.</label>
          <div className="login-form_email-input-container">
            <MyInput
              className="login-form_email-input"
              type="email"
              placeholder="Email Address"
              {...register('login', {
                required: 'This field must be completed',
                pattern: {
                  value: /^\S+@([\w-]+\.)+[\w-]{2,4}$/,
                  message:
                    'Invalid email format. Please write an email in the format user@example.com/ru',
                },
              })}
              style={{
                border: errors.login ? '1px solid red' : '',
              }}
            />
            {errors.login && <span>{errors.login.message}</span>}
          </div>
          <div className="login-form_password-input-container">
            <MyInput
              className="login-form_password-input"
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
          <label className="login-form_remember-Label" htmlFor="rem">
            {' '}
            Please remember me
            <MyInput className="login-form_remember-Input" type="checkbox" id="rem" />
          </label>
          <MyButton className="btn_black " text="Sign in" type="submit" />
        </fieldset>
      </form>
    </div>
  );
}

export default AccountPage;
