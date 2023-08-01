import React, { InputHTMLAttributes } from 'react';

export type CheckBoxProps = {
  label: string | JSX.Element;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Checkbox({ label, name, ...props }: CheckBoxProps) {
  return (
    <div className="checkboxForm">
      <label htmlFor={name} className="container">
        <input type="checkbox" name={name} id={name} {...props} />
        <span className="checkmark"></span>
        {label}
      </label>
    </div>
  );
}
