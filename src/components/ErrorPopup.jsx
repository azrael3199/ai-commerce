import React, { useEffect, useState } from "react";
import { Snackbar, IconButton, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { dark } from "../themes";

export default function ErrorPopup({ message, reset }) {
  const [show, setShow] = useState(!!message);

  console.log(!!message);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      reset();
    }, 15000); // Timeout of 15 seconds

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleAnimationEnd = () => {
    if (!show) {
      reset();
    }
  };

  return (
    <Snackbar
      open={show}
      onClose={() => setShow(false)}
      autoHideDuration={15000}
      onExited={handleAnimationEnd}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} // Move to top-center
      sx={{
        backgroundColor: dark.notification.error,
        borderRadius: "8px",
        padding: "8px 12px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <ErrorOutlineIcon
          sx={{
            color: dark.text.hover,
          }}
        />
        <Typography variant="body1" color={dark.text.hover} sx={{ ml: 2 }}>
          {message}
        </Typography>
        <IconButton
          size="small"
          aria-label="close"
          onClick={() => {
            setShow(false);
            reset();
          }}
        >
          <CloseIcon
            fontSize="small"
            sx={{
              color: dark.text.hover,
            }}
          />
        </IconButton>
      </div>
    </Snackbar>
  );
}
