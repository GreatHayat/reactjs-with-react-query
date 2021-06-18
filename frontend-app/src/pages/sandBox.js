import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputField from "../components/inputField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const SandBox = () => {
  return (
    <React.Fragment>
      <InputField
        variant="outlined"
        placeholder="Enter Your UserName"
        label="Username"
        required
        defaultValue="Hello JS"
        helperText="This is a helper text!"
        error
      />
      <br />
      <br />
      <InputField
        variant="filled"
        placeholder="Enter Your UserName"
        label="Username"
        defaultValue="Hello Python"
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <AccountCircle />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <br />
      <InputField
        variant="outlined"
        label="Enter Your Username"
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </React.Fragment>
  );
};

export default SandBox;
