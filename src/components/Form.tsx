import React, { useState } from 'react';
import InputField from './InputField';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Checkbox from './Checkbox';
import Button from './Button';

type FormValues = {
  email: string;
  password: string;
};

type Notification = {
  message?: string;
  isShow?: boolean;
  status?: 'success' | 'redirect';
};

const defaultValues: FormValues = {
  email: '',
  password: '',
};

const defaultNotification: Notification = {
  message: undefined,
  isShow: false,
  status: undefined,
};

export default function Form() {
  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: { ...defaultValues },
  });
  const { handleSubmit, reset } = methods;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const [notification, setNotification] =
    useState<Notification>(defaultNotification);

  const handleNotification = (message: string, isSuccess?: boolean) => {
    setNotification({
      message: message,
      isShow: true,
      status: isSuccess ? 'success' : 'redirect',
    });
    setTimeout(() => {
      setNotification(defaultNotification);
    }, 3000);
  };

  const onSubmit: SubmitHandler<FormValues> = (
    data: FormValues,
    e?: React.BaseSyntheticEvent
  ) => {
    setLoadingLogin(true);
    setTimeout(() => {
      setLoadingLogin(false);
      reset();
      handleNotification(
        `Welcome, email: ${data.email}, password: ${data.password}`,
        true
      );
    }, 3000);
  };

  return (
    <div className="formSection">
      {notification.isShow && (
        <div className="notification" data-status={notification.status}>
          <span>{notification.message}</span>
        </div>
      )}

      <FormProvider {...methods}>
        <h1>Hello</h1>
        <p>Enter your email and password to login.</p>
        <form className="formWrapper" onSubmit={handleSubmit(onSubmit)}>
          <InputField name="email" label="Email" type="email" required />
          <InputField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            required
            toggleEye={(e) => {
              setShowPassword(e);
            }}
          />
          <div className="infoWrapper">
            <Checkbox label="Remember me" name="remember_me" />
            <Button href="#">Forgot Password?</Button>
          </div>
          <div className="buttonSubmit">
            <Button type="submit" variant="primary" loading={loadingLogin}>
              Login
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleNotification('Redirect to Sign Up')}
            >
              Sign Up
            </Button>
          </div>
          <div className="divider">
            <span>Or, login with</span>
          </div>
          <div className="buttonAuth">
            <Button
              variant="secondary"
              size="small"
              onClick={() => handleNotification('Redirect Login Facebook')}
            >
              Facebook
            </Button>
            <Button
              variant="secondary"
              size="small"
              onClick={() => handleNotification('Redirect Login Linked In')}
            >
              Linked In
            </Button>
            <Button
              variant="secondary"
              size="small"
              onClick={() => handleNotification('Redirect Login Google')}
            >
              Google
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
