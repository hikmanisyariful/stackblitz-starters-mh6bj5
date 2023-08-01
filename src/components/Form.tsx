import React, { useState } from 'react';
import InputField from './InputField';
import { FormProvider, useForm } from 'react-hook-form';
import Checkbox from './Checkbox';

export default function Form() {
  const methods = useForm({
    mode: 'onChange',
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
          <div className="info">
            <Checkbox label="Remember me" name="remember_me" />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
