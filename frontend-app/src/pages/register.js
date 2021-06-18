import React from "react";
import { Box, TextField, IconButton, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Formik, useField, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(8, "Username should contains at least 8 characters")
    .required()
    .label("Username"),
  email: Yup.string()
    .email()
    .required("You can't leave email as empty field")
    .label("Email"),
});

const Register = () => {
  return (
    <React.Fragment>
      <Formik
        initialValues={{ username: "", email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {() => (
          <Form>
            <BootStrapInputField name="username" placeholder="Enter Username" />
            <BootStrapInputField name="email" placeholder="Enter Email" />
            <div className="form-group">
              <button className="btn btn-primary">SUBMIT</button>
            </div>
          </Form>
        )}
      </Formik>

      <Formik
        initialValues={{ username: "", email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {() => (
          <Form>
            <Box display="flex" flexDirection="column" pb={10}>
              <Box width={[1, 1 / 3]} mt={5}>
                <MaterialInputField
                  label="Username"
                  variant="outlined"
                  name="username"
                  placeholder="Enter Username"
                />
              </Box>
              <Box width={[1, 1 / 3]} mt={5}>
                <MaterialInputField
                  label="Email"
                  variant="outlined"
                  name="email"
                  placeholder="Enter Email"
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
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default Register;

const BootStrapInputField = (props) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-group">
      <input className="form-control" {...field} {...props} />
      {meta.touched && meta.error && (
        <div className="alert alert-danger">{meta.error}</div>
      )}
    </div>
  );
};

const MaterialInputField = (props) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      {...field}
      {...props}
      error={meta.touched && meta.error ? true : false}
      helperText={meta.touched && meta.error}
    />
  );
};
