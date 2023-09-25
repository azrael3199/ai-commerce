import React, { useContext, useEffect, useState } from "react";
import { AuthContainer } from "./Authentication";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../../appwrite";
import { AppContext } from "../../context/AppContext";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { dark } from "../../themes";

const ChangePassword = () => {
  const { setError, setLoading } = useContext(AppContext);
  const [userId, setUserId] = useState(null);
  const [secret, setSecret] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uId = urlParams.get("userId");
    const s = urlParams.get("secret");

    if (!uId || !s) {
      navigate("/auth");
    } else {
      setUserId(uId);
      setSecret(s);
    }
  }, []);

  /**
   * Initial form values and validation schema.
   */
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
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

      setLoading("");
      // Call the Change password API
      api
        .verifyChangePassword(userId, secret, trimmedValues.password)
        .then(() => {
          navigate("/auth");
        })
        .catch((err) => {
          setError({ message: err.message, type: "error" });
        })
        .finally(() => {
          setLoading(null);
        });
    },
  });

  return (
    <AuthContainer>
      <Box width="100%">
        <Typography
          component="h1"
          variant="h5"
          sx={{ mt: 2, color: dark.text.primary }}
          textAlign="center"
        >
          Change Password
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
            id="password"
            placeholder="New Password*"
            name="password"
            type="password"
            autoComplete="password"
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
            {...formik.getFieldProps("password")}
          />
          <FormHelperText
            error={formik.touched.password && Boolean(formik.errors.password)}
            style={{
              color: dark.notification.error,
            }}
          >
            {formik.touched.password && formik.errors.password}
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
            Change Password
          </Button>
        </Box>
      </Box>
    </AuthContainer>
  );
};

export default ChangePassword;
