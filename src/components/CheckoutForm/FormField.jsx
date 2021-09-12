import React from "react"
import { FormRow, FormRowLabel, FormRowInput } from "./CheckoutElements"

const FormField = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => {
  return (
    <FormRow>
      <FormRowLabel htmlFor={id}>{label}</FormRowLabel>
      <FormRowInput
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
    </FormRow>
  )
}

export default FormField
