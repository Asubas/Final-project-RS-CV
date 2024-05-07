import './loginPage.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import MyButton from '../../components/button/button';
import MyInput from '../../components/input/input';

type Inputs = {
  login: string;
  password: string;
};

function AccountPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onChange' });
  // const { onChange, onBlur, name, ref } = register('login');
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const isUppercase = (value: string) => /[A-Z]/.test(value);
  const isLowercase = (value: string) => /[a-z]/.test(value);
  const hasNumber = (value: string) => /\d/.test(value);
  const isNotWhitespace = (value: string) => /^\S.*\S$/.test(value);

  return (
    <div className="authorization-field">
      <form onSubmit={handleSubmit(onSubmit)} className="authorization-field_form login-form">
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
                border: errors.login ? '1px solid red' : ' 1px solid black',
              }}
            />
            {errors.login && <span>{errors.login.message}</span>}
          </div>
          <div className="login-form_password-input-container">
            <MyInput
              className="login-form_password-input"
              type="password"
              placeholder="Enter your password"
              {...register('password', {
                required: 'This field must be completed',
                validate: {
                  uppercase: (value) =>
                    isUppercase(value) ||
                    'Password must contain at least one uppercase character A-Z',
                  lowercase: (value) =>
                    isLowercase(value) ||
                    'Password must contain at least one lowercase character a-z',
                  number: (value) =>
                    hasNumber(value) || 'Password must contain at least one number',
                  notWhitespace: (value) =>
                    isNotWhitespace(value) || 'Password must not start or end with whitespace',
                  length: (value) =>
                    value.length >= 8 || 'Password must be at least 8 characters long',
                },
              })}
              style={{
                border: errors.password ? '1px solid red' : ' 1px solid black',
              }}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <label className="login-form_remember-Label" htmlFor="rem">
            {' '}
            Please remember me
            <MyInput className="login-form_remember-Input" type="checkbox" id="rem" />
          </label>
          <MyButton className="btn_black " text="Sign in" type="submit" disabled={false} />
        </fieldset>
      </form>
    </div>
  );
}

export default AccountPage;
