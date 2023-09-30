import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import {
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
} from "@mui/icons-material";
import { dark } from "../themes";

const QuantitySelector = ({ quantity, addItemToCart, removeItemFromCart }) => {
  const handleIncrement = () => {
    addItemToCart();
  };

  const handleDecrement = () => {
    removeItemFromCart();
  };

  return (
    <Box
      sx={{
        borderRadius: "8px",
        backgroundColor: dark.card.background,
        padding: "5px",
      }}
    >
      <IconButton onClick={handleDecrement} sx={{ padding: 0 }}>
        <KeyboardArrowLeftOutlined
          sx={{
            fontSize: 24,
            backgroundColor: dark.accent.highlight,
            color: dark.background,
            borderRadius: "8px",
          }}
        />
      </IconButton>
      <Typography
        variant="body2"
        component="span"
        sx={{
          fontSize: 16,
          fontWeight: 500,
          padding: "2px 16px",
        }}
      >
        {quantity}
      </Typography>
      <IconButton
        onClick={handleIncrement}
        disabled={quantity === 10}
        sx={{ padding: 0 }}
      >
        <KeyboardArrowRightOutlined
          sx={{
            fontSize: 24,
            backgroundColor: dark.accent.highlight,
            color: dark.background,
            padding: 0,
            borderRadius: "8px",
          }}
        />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;
