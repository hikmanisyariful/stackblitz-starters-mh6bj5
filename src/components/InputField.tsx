import React, { InputHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";

export type InputFieldProps = {
  label?: string;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputField({
  label,
  name,
  required = false,
  type = "text",
  ...props
}: InputFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      rules={{
        required: { value: required, message: "This field is required." },
      }}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className="formControl">
            {label && <label htmlFor={name}> {label} </label>}
            <input {...field} type={type} {...props} />
            {error && <ErrorField message={error.message} />}
          </div>
        );
      }}
    />
  );
}

function ErrorField({ message }: { message?: string }) {
  return <span className="errorMessaage">{message ?? "Error"}</span>;
}
