import React, { useContext, useState } from "react";
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

      setLoading("Logging in ...");
      api
        .createSession(trimmedValues.email, trimmedValues.password)
        .then(async () => {
          try {
            const user = await api.getAccount();
            console.log(user);
            if (!user.emailVerification) {
              await api.verifyEmail();
            }
            user.cartItems = {};
            onAuth(user);
            formik.resetForm();
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

  const handleChangePassword = () => {
    setLoading("");
    const recoveryEmail = prompt("Enter your email").trim();
    if (recoveryEmail) {
      api
        .changePassword(recoveryEmail)
        .then((res) => {
          if (res) {
            setError({
              message:
                "Click on the link sent to your email to reset the password",
              type: "info",
            });
          } else {
            setError({ message: "Some error occurred", type: "error" });
          }
        })
        .catch((err) => {
          setError({ message: err.message, type: "error" });
        });
    } else {
    }
  };

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
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Link
            variant="body2"
            sx={{ color: "#5BC0EB" }}
            onClick={() => handleChangePassword()}
          >
            Forgot password?
          </Link>
          <Link
            onClick={() => setRegister()}
            variant="body2"
            sx={{ color: "#5BC0EB" }}
          >
            Don't have an account? Sign Up
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
