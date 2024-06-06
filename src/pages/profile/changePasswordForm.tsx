import validatePassword from '../accountPage/validatePassword';
import '../accountPage/loginPage.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import MyButton from '../../components/button/button';
import MyInput from '../../components/input/input';

type Inputs = {
  passwordCur: string;
  password: string;
};

function ChangePasswordForm() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: 'onChange' });

  const passwordCur = watch('passwordCur');
  const password = watch('password');

  const inputContainerPasswordNameCur = `viewPassword ${passwordCur ? 'not-empty' : 'empty'}`;
  const [typeCur, setTypeCur] = useState<'password' | 'text'>('password');

  const showPasswordCur = () => {
    setTypeCur(typeCur === 'password' ? 'text' : 'password');
  };

  const inputContainerPasswordName = `viewPassword ${password ? 'not-empty' : 'empty'}`;
  const [type, setType] = useState<'password' | 'text'>('password');

  const showPassword = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  const onSubmit: SubmitHandler<Inputs> = async () => {
    return;
  };

  return (
    <div className="passFormWrap">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`authorization-field_form login-form ${isValid ? 'form-valid' : 'form-invalid'}`}
      >
        <fieldset className="login-form_fieldset">
          <div className="login-form_password-input-container">
            <MyInput
              className="login-form_password-input"
              type={typeCur}
              placeholder="Enter your current password"
              {...register('passwordCur', {
                required: 'This field must be completed',
                validate: validatePassword,
              })}
              autoComplete="current-password"
              style={{
                border: errors.passwordCur ? '1px solid red' : '',
              }}
            />
            <span className={inputContainerPasswordNameCur} onClick={showPasswordCur}></span>
            {errors.passwordCur && <span>{errors.passwordCur.message}</span>}
          </div>
          <div className="login-form_password-input-container">
            <MyInput
              className="login-form_password-input"
              type={type}
              placeholder="Enter your new password"
              {...register('password', {
                required: 'This field must be completed',
                validate: validatePassword,
              })}
              autoComplete="new-password"
              style={{
                border: errors.password ? '1px solid red' : '',
              }}
            />
            <span className={inputContainerPasswordName} onClick={showPassword}></span>
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <MyButton className="btn_white" type="submit">
            Change password
          </MyButton>
        </fieldset>
      </form>
    </div>
  );
}

export default ChangePasswordForm;
