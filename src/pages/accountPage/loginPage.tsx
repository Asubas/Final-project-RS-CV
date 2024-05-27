import './loginPage.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import MyButton from '../../components/button/button';
import MyInput from '../../components/input/input';
import validatePassword from './validatePassword';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import createAuthorizedClient from '../../lib/userLoginFlow';
import apiRoot, { projectKey } from '../../lib/anonymFlow';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginRef, reqRef } from '../../components/header/navBar/navBar';
import { errorLogin, successLogin } from '../../components/toastyOption/toastyOptions';

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

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { login, password } = data;
    if (isValid) {
      const loggedUser = await apiRoot()
        .withProjectKey({ projectKey })
        .login()
        .post({
          body: {
            email: login,
            password: password,
          },
        })
        .execute()
        .then((res) => {
          if (res.statusCode === 200) {
            localStorage.setItem('userId', `${res.body.customer.id}`);
            navigate('/');
            if (loginRef.current && reqRef.current) {
              loginRef.current.textContent = 'log out';
              reqRef.current.textContent = 'profile';
            }
            toast.success('🎉 You have successfully logged in', successLogin);
            createAuthorizedClient(login, password).withProjectKey({ projectKey }).get().execute();
            return res.body.customer;
          }
        })
        .catch(() => {
          toast.error('Invalid email or password or such user does not exist!', errorLogin);
        });
      return loggedUser;
    }
  };

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
              type="text"
              placeholder="Email Address"
              {...register('login', {
                required: 'This field must be completed',
                pattern: {
                  value: /^\S+@([\w-]+\.)+[\w-]{2,4}$/,
                  message:
                    'Invalid email format. Please write an email in the format user@example.com/ru',
                },
              })}
              autoComplete="username"
              style={{
                border: errors.login ? '1px solid red' : '',
              }}
            />
            {errors.login && <span>{errors.login?.message}</span>}
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
              autoComplete="current-password"
              style={{
                border: errors.password ? '1px solid red' : '',
              }}
            />
            <span className={inputContainerPasswordName} onClick={showPassword}></span>
            {errors.password && <span>{errors.password?.message}</span>}
          </div>
          <MyButton className="btn_white " type="submit">
            {' '}
            Sign in
          </MyButton>
          <Link to="/registration" className="btn_black">
            SIGN UP
          </Link>
        </fieldset>
      </form>
    </div>
  );
}

export default AccountPage;
