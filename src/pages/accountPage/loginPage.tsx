import './loginPage.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import MyButton from '../../components/button/button';
import MyInput from '../../components/input/input';
import validatePassword from './validatePassword';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import createAuthorizedClient from '../../lib/userLoginFlow';
import apiRoot, { projectKey } from '../../lib/anonymFlow';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Inputs = {
  login: string;
  password: string;
};

function AccountPage() {
  const {
    watch,
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isValid, isDirty },
  } = useForm<Inputs>({ mode: 'onChange' });

  const [catchError, setCatchError] = useState('');
  const [hasCatchError, setHasCatchError] = useState(false);
  const navigate = useNavigate();

  const messageErrorResponse = 'Invalid email or password or such user does not exist';
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
            toast.success('🦄 You have successfully logged in', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
              transition: Bounce,
            });
            createAuthorizedClient(login, password).withProjectKey({ projectKey }).get().execute();
            return res.body.customer;
          }
        })
        .catch(() => {
          setCatchError(`${messageErrorResponse}`);
          setHasCatchError(true);
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

  useEffect(() => {
    if (isDirty && !isValid) {
      setCatchError('');
      setHasCatchError(false);
      clearErrors();
    }
  }, [isDirty, isValid, clearErrors]);
  return (
    <div className="authorization-field">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`authorization-field_form login-form ${isValid && !hasCatchError ? 'form-valid' : 'form-invalid'}`}
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
                border: errors.login || catchError ? '1px solid red' : '',
              }}
            />
            {(errors.login || catchError) && <span>{errors.login?.message || catchError}</span>}
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
                border: errors.password || catchError ? '1px solid red' : '',
              }}
            />
            <span className={inputContainerPasswordName} onClick={showPassword}></span>
            {(errors.password || catchError) && (
              <span>{errors.password?.message || catchError}</span>
            )}
          </div>
          <MyButton className="btn_black " type="submit">
            {' '}
            Sign in
          </MyButton>
          <MyButton className="btn_black " type="button">
            {' '}
            Sign up
          </MyButton>
        </fieldset>
      </form>
    </div>
  );
}

export default AccountPage;
