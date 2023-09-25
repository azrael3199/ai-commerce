import React from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { dark } from "../themes";

const LoadingOverlay = ({ loadingMessage }) => {
  console.log("In here");

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
        zIndex: 9999,
      }}
    >
      <Card
        style={{
          maxWidth: 400,
          padding: "8px",
          textAlign: "center",
          backgroundColor: dark.card.background,
        }}
      >
        <CardContent>
          <Typography variant="body1" color={dark.text.hover} sx={{ mb: 2 }}>
            {loadingMessage && loadingMessage.length > 0
              ? loadingMessage
              : "Loading ..."}
          </Typography>
          <CircularProgress sx={{ color: dark.accent.highlight }} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoadingOverlay;
