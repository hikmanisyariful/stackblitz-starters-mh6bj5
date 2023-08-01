import React from "react";
import InputField from "./InputField";

export default function Form() {
  return (
    <div>
      <h1>Hello</h1>
      <h6>Enter your email and password to login</h6>

      <div>
        <InputField name="email" label="email" />
      </div>
    </div>
  );
}
