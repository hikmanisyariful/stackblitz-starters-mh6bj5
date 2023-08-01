import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import { Controller, useFormContext, ValidationRule } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { RiErrorWarningLine } from 'react-icons/ri';

export type InputFieldProps = {
  label?: string;
  name: string;
  toggleEye?: (show: boolean) => void;
} & InputHTMLAttributes<HTMLInputElement>;

type FieldPatternRules = Map<
  HTMLInputTypeAttribute,
  (ValidationRule<RegExp> & { minLength: number }) | undefined
>;

const patterns = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.;,?])/,
  text: /^[A-Za-z0-9 _.-]*[A-Za-z0-9][A-Za-z0-9 _.-]*$/,
  email:
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export default function InputField({
  label,
  name,
  required = false,
  type = 'text',
  toggleEye,
  ...props
}: InputFieldProps) {
  const { control } = useFormContext();

  const fieldPatternRules: FieldPatternRules = new Map();
  fieldPatternRules
    .set('email', {
      value: patterns.email,
      message: 'Please enter a valid email (e.g., example@mail.com).',
      minLength: 3,
    })
    .set('text', {
      value: patterns.text,
      message: 'Must only contains letters, numbers, and ( _ , - , . )',
      minLength: 3,
    })
    .set('password', {
      value: patterns.password,
      message:
        'Password must contains Uppercase, Lowercase, Symbol, and Number.',
      minLength: 8,
    });

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: { value: required, message: 'This field is required.' },
        pattern: fieldPatternRules.get(toggleEye ? 'password' : type),
        minLength: { value: 1, message: 'Minimal character 1' },
      }}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            <div className="formControl">
              {label && <label htmlFor={name}> {label} </label>}
              <div className="inputWrapper">
                <input {...field} type={type} {...props} />
                {toggleEye && (
                  <EyeComponent type={type} toggleEye={toggleEye} />
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
  return (
    <div className="errorMessage">
      <RiErrorWarningLine className="warningIcon" />
      <span>{message ?? 'Error'}</span>
    </div>
  );
}

function EyeComponent({
  type,
  toggleEye,
}: {
  type: string;
  toggleEye: (show: boolean) => void;
}) {
  return (
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
  );
}
