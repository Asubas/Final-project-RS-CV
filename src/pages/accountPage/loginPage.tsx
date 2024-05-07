import './loginPage.scss';
import MyButton from '../../components/button/button';

function loginPage() {
  return (
    <div className="greyWrapper greyWrapper_loginFiled">
      <form className="loginForm">
        <fieldset className="loginForm__fieldset">
          <legend className="loginForm__legend">Already a customer?</legend>
          <label className="loginForm__label">Welcome back! Sign in for faster checkout.</label>
          <input className="emailInput" type="email" placeholder="Email Address"></input>
          <input
            className="passwordInput"
            type="password"
            placeholder="Enter your password"
          ></input>
          <label className="rememberMe__label" htmlFor="rem">
            {' '}
            Please remember me
          </label>
          <input className="rememberMe__input" type="checkbox" id="rem"></input>
          <a href="#" className="forget">
            Forget password?
          </a>
          <MyButton text="SIGN IN" className="button" type="submit" />
        </fieldset>
      </form>
    </div>
  );
}

export default loginPage;
