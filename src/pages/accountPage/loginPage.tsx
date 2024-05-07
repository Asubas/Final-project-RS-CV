import './loginPage.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import MyButton from '../../components/button/button';
type Inputs = {
  example: string;
  exampleRequired: string;
};

function AccountPage() {
  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div className="authorization-field">
      <form onSubmit={handleSubmit(onSubmit)} className="authorization-field_form login-form">
        <fieldset className="login-form_fieldset">
          <legend className="login-form_legend">Already a customer?</legend>
          <label className="login-form_label">Welcome back! Sign in for faster checkout.</label>
          <div className="login-form_email-input-container">
            <input
              className="login-form_email-input"
              type="email"
              placeholder="Email Address"
            ></input>
          </div>
          <div className="login-form_password-input-container">
            <input
              className="login-form_password-input"
              type="password"
              placeholder="Enter your password"
            ></input>
          </div>
          <label className="login-form_remember-Label" htmlFor="rem">
            <a href="#" className="login-form_link">
              {' '}
              Forget password?
            </a>{' '}
            Please remember me
            <input className="login-form_remember-Input" type="checkbox" id="rem"></input>
          </label>
          <MyButton text="Sign in" type="submit" />
        </fieldset>
      </form>
    </div>
  );
}

export default AccountPage;
