import React from "react";
import { FormControl, TextField } from "@material-ui/core";

const InputField = ({ variant, label, ...rest }) => {
  return (
    <FormControl>
      <TextField variant={variant} label={label} {...rest} />
    </FormControl>
  );
};

export default InputField;
