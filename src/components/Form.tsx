import React, { useState } from 'react';
import InputField from './InputField';
import { FormProvider, useForm } from 'react-hook-form';

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
        {JSON.stringify(showPassword)}
        <form className="formWrapper">
          <InputField name="email" label="Email" />
          <InputField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            toggleEye={(e) => {
              setShowPassword(e);
            }}
          />
        </form>
      </FormProvider>
    </div>
  );
}
