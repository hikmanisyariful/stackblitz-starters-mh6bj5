import React, { useState } from 'react';
import InputField from './InputField';
import { FormProvider, useForm } from 'react-hook-form';
import Checkbox from './Checkbox';
import Button from './Button';

export default function Form() {
  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="formSection">
      <FormProvider {...methods}>
        <h1>Hello</h1>
        <p>Enter your email and password to login.</p>
        <form className="formWrapper">
          <InputField name="email" label="Email" type="email" />
          <InputField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            toggleEye={(e) => {
              setShowPassword(e);
            }}
          />
          <div className="infoWrapper">
            <Checkbox label="Remember me" name="remember_me" />
            <Button href="#">Forgot Password?</Button>
          </div>
          <div className="buttonSubmit">
            <Button type="submit" variant="primary">
              Login
            </Button>
            <Button variant="secondary">Sign Up</Button>
          </div>
          <div className="divider">
            <span>Or, login with</span>
          </div>
          <div className="buttonAuth">
            <Button type="submit" variant="secondary" size="small">
              Facebook
            </Button>
            <Button variant="secondary" size="small">
              Linked In
            </Button>
            <Button variant="secondary" size="small">
              Google
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
