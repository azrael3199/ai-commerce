import React, { useContext } from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import { dark } from "../themes";
import { AppContext } from "../context/AppContext";
import ProductCapsule from "./ProductCapsule";

const CartPanel = ({ isOpen, onClose }) => {
  const { currentUser } = useContext(AppContext);
  console.log(currentUser.cartItems);
  const cartItems = Object.values(currentUser.cartItems);

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      {/* Add cart UI and checkout items here */}
      <Box
        backgroundColor={dark.card.backgroundSecondary}
        display="flex"
        flexDirection="column"
        sx={{ padding: "16px", width: "30vw", height: "100%" }}
      >
        <Typography variant="h5" fontWeight="bold" color={dark.text.secondary}>
          Your Cart
        </Typography>
        {/* Add cart contents */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          flex={1}
          p={2}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            flex={1}
            gap={2}
          >
            {cartItems.length === 0 && (
              <Typography
                variant="subtitle1"
                fontWeight={500}
                color={dark.text.secondary}
              >
                No items in the cart
              </Typography>
            )}
            {cartItems.map((item) => (
              <ProductCapsule
                productName={item.name}
                quantity={item.quantity}
                productPrice={item.price}
                totalAmount={item.amount}
                currency={item.currency}
              />
            ))}
            {cartItems.length > 0 && (
              <Typography
                variant="h6"
                fontSize={18}
                fontWeight="bold"
                color={dark.text.primary}
              >
                Total Cost:{" "}
                {`${cartItems
                  .map((item) => item.amount)
                  .reduce((tot, cur) => (tot += cur))} ${
                  Object.values(cartItems)[0].currency
                }`}
              </Typography>
            )}
          </Box>
          <Button
            variant="filled"
            sx={{
              backgroundColor: dark.accent.primary,
              color: dark.text.hover,
              minWidth: "60%",
              "&.Mui-disabled": {
                background: dark.disabled.background,
                color: dark.disabled.text,
              },
            }}
            disabled={cartItems.length === 0}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartPanel;
