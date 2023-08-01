import React, { InputHTMLAttributes, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export type InputFieldProps = {
  label?: string;
  name: string;
  toggleEye?: (show: boolean) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputField({
  label,
  name,
  required = false,
  type = 'text',
  toggleEye,
  ...props
}: InputFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      rules={{
        required: { value: required, message: 'This field is required.' },
      }}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            <div className="formControl">
              {label && <label htmlFor={name}> {label} </label>}
              <div className="inputWrapper">
                <input {...field} type={type} {...props} />
                {toggleEye && (
                  <div className="eyeIcon">
                    {type === 'password' ? (
                      <AiOutlineEyeInvisible
                        className="eye-outlined"
                        onClick={() => {
                          toggleEye(true);
                        }}
                      />
                    ) : (
                      <AiOutlineEye
                        className="eye-outlined"
                        onClick={() => {
                          toggleEye(false);
                        }}
                      />
                    )}
                  </div>
                )}
              </div>

              {error && <ErrorField message={error.message} />}
            </div>
          </>
        );
      }}
    />
  );
}

function ErrorField({ message }: { message?: string }) {
  return <span className="errorMessaage">{message ?? 'Error'}</span>;
}
