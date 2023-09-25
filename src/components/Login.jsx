import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LockOutlined } from "@mui/icons-material";
import api from "../appwrite";
import { dark } from "../themes";

const Login = ({ setRegister, onAuth }) => {
  const { setError, setLoading } = useContext(AppContext);

  /**
   * Initial form values and validation schema.
   */
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string()
      .trim()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
        "Password must contain at least 8 characters, including one letter and one number."
      ),
  });

  /**
   * Handles user login with provided email and password.
   *
   * Calls Appwrite SDK createSession method to initialize a session.
   * Gets the user account details.
   * Starts the user session by calling startSession method.
   *
   */
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Submit logic here

      const trimmedValues = Object.keys(values).reduce((result, key) => {
        // Perform the transformation on the original value
        const trimmedValue = values[key];
        // Assign the transformed value to the key in the result object
        result[key] = trimmedValue;
        return result;
      }, {});

      setLoading("Loading");
      api
        .createSession(trimmedValues.email, trimmedValues.password)
        .then(async () => {
          try {
            const user = await api.getAccount();
            console.log(user);
            onAuth(user);
            formik.resetForm();
          } catch (error) {
            throw error;
          }
        })
        .catch((error) => {
          console.log(error.message);
          setError(error.message);
        })
        .finally(() => {
          setLoading(null);
        });
    },
  });

  return (
    <Box width="100%">
      <Typography
        component="h1"
        variant="h5"
        sx={{ mt: 2, color: dark.text.primary }}
        textAlign="center"
      >
        Sign in
      </Typography>
      <Box
        component="form"
        noValidate
        sx={{ mt: 3, width: "100%" }}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          placeholder="Email*"
          name="email"
          autoComplete="email"
          autoFocus
          variant="filled"
          InputProps={{
            inputProps: {
              sx: {
                py: "12px",
                pl: "8px",
                color: dark.text.primary,
              },
            },
            startAdornment: (
              <LockOutlined
                position="start"
                sx={{ color: dark.accent.highlight }}
              />
            ),
          }}
          sx={{
            backgroundColor: dark.input.background,
          }}
          {...formik.getFieldProps("email")}
        />
        <FormHelperText
          error={formik.touched.email && Boolean(formik.errors.email)}
          style={{
            color: dark.notification.error,
          }}
        >
          {formik.touched.email && formik.errors.email}
        </FormHelperText>
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          placeholder="Password*"
          type="password"
          id="password"
          autoComplete="current-password"
          variant="filled"
          InputProps={{
            inputProps: {
              sx: {
                py: "12px",
                pl: "8px",
                color: dark.text.primary,
              },
            },
            startAdornment: (
              <LockOutlined
                position="start"
                sx={{ color: dark.accent.highlight }}
              />
            ),
          }}
          sx={{
            backgroundColor: dark.input.background,
          }}
          {...formik.getFieldProps("password")}
        />
        <FormHelperText
          error={
            formik.touched.password &&
            (Boolean(formik.errors.password) || formik.errors.customValidation)
          }
          style={{
            color: dark.notification.error,
          }}
        >
          {formik.touched.password &&
            (formik.errors.password || formik.errors.customValidation)}
        </FormHelperText>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: dark.accent.primary,
            color: "white",
          }}
          disabled={Object.keys(formik.errors).length || !formik.dirty}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link
              component={RouterLink}
              to="/forgot-password"
              variant="body2"
              sx={{ color: "#5BC0EB" }}
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link
              onClick={() => setRegister()}
              variant="body2"
              sx={{ color: "#5BC0EB" }}
            >
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
