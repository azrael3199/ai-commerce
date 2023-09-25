import React from "react";
import { Box, Drawer, Typography } from "@mui/material";
import { dark } from "../themes";

const CartPanel = ({ isOpen, onClose }) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      {/* Add cart UI and checkout items here */}
      <Box
        backgroundColor={dark.card.backgroundSecondary}
        sx={{ padding: "16px", width: "30vw", height: "100%" }}
      >
        <Typography variant="h5" fontWeight="bold" color={dark.text.secondary}>
          Your Cart
        </Typography>
        {/* Add cart contents */}
      </Box>
    </Drawer>
  );
};

export default CartPanel;
