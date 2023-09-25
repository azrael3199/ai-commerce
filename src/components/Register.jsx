import React, { useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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

const Register = ({ setLogin }) => {
  const { setError, setLoading } = useContext(AppContext);
  /**
   * Initial form values and validation schema.
   */
  const initialValues = {
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .required("Email is required")
      .email("Invalid email address"),
    firstname: Yup.string()
      .trim()
      .required("First Name is required")
      .min(2, "First Name must be at least 2 characters")
      .max(50, "First Name must be at most 50 characters"),
    lastname: Yup.string()
      .trim()
      .required("Last Name is required")
      .min(2, "Last Name must be at least 2 characters")
      .max(50, "Last Name must be at most 50 characters"),
    password: Yup.string()
      .trim()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
        "Password must contain at least 8 characters, including one letter and one number."
      ),
    confirmPassword: Yup.string()
      .trim()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
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

      console.log(trimmedValues);

      setLoading("");
      api
        .createAccount(
          trimmedValues.email,
          trimmedValues.password,
          `${trimmedValues.firstname} ${trimmedValues.lastname}`
        )
        .then(async () => {
          try {
            setError({
              message: "User created successfully. Redirecting to login...",
              type: "success",
            });
            setTimeout(() => {
              formik.resetForm();
              setLogin();
            }, 4000);
          } catch (error) {
            throw error;
          }
        })
        .catch((error) => {
          console.log(error.message);
          setError({ message: error.message, type: "error" });
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
        Sign up
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
          id="firstname"
          placeholder="First Name*"
          name="firstname"
          autoComplete="firstname"
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
          {...formik.getFieldProps("firstname")}
        />
        <FormHelperText
          error={formik.touched.firstname && Boolean(formik.errors.firstname)}
          style={{
            color: dark.notification.error,
          }}
        >
          {formik.touched.firstname && formik.errors.firstname}
        </FormHelperText>
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastname"
          placeholder="Last Name*"
          name="lastname"
          autoComplete="lastname"
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
          {...formik.getFieldProps("lastname")}
        />
        <FormHelperText
          error={formik.touched.lastname && Boolean(formik.errors.lastname)}
          style={{
            color: dark.notification.error,
          }}
        >
          {formik.touched.lastname && formik.errors.lastname}
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
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          placeholder="Confirm Your Password*"
          type="password"
          id="confirmPassword"
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
          {...formik.getFieldProps("confirmPassword")}
        />
        <FormHelperText
          error={
            formik.touched.confirmPassword &&
            (Boolean(formik.errors.confirmPassword) ||
              formik.errors.customValidation)
          }
          style={{
            color: dark.notification.error,
          }}
        >
          {formik.touched.confirmPassword &&
            (formik.errors.confirmPassword || formik.errors.customValidation)}
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
          Sign Up
        </Button>
        <Box textAlign="center">
          <Link
            onClick={() => setLogin()}
            variant="body2"
            sx={{ color: "#5BC0EB" }}
          >
            Already have an account? Sign In
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
