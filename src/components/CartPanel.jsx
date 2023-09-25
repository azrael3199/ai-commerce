import React, { useContext } from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import { dark } from "../themes";
import { AppContext } from "../context/AppContext";
import ProductCapsule from "./ProductCapsule";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import api from "../appwrite";
import config from "../config";

const CartPanel = ({ isOpen, onClose }) => {
  const { currentUser, setLoading, setError, startSession } =
    useContext(AppContext);
  const stripe = useStripe();
  const elements = useElements();

  const cartItems = Object.values(currentUser.cartItems);

  const mockStripePayment = async () => {
    // Simulate a Stripe payment request
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate a delay

    // Mock a successful payment response
    return { token: "mock-stripe-token" };
  };

  const handleCheckout = async () => {
    if (!stripe || !elements) return;

    try {
      setLoading("Processing Payment");

      // Simulate a payment request
      const { token } = await mockStripePayment();
      console.log("Received token:", token);
      const newOrder = {
        userEmail: currentUser.email,
        cartItems: JSON.stringify(currentUser.cartItems),
        totalAmount: cartItems
          .map((item) => item.amount)
          .reduce((tot, cur) => (tot += cur))
          .toFixed(2),
        currency: cartItems[0].currency,
      };

      await api.createDocument(
        config.dbProductsId,
        config.collectionOrdersId,
        newOrder
      );

      setError({ message: "Order placed successfully", type: "success" });
      const newUser = { ...currentUser };
      newUser.cartItems = {};
      startSession(newUser);
    } catch (error) {
      console.log(error.message);
      setError({ message: error.message, type: "error" });
    } finally {
      setLoading(null);
    }
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      {/* Add cart UI and checkout items here */}
      <Box
        backgroundColor={dark.card.backgroundSecondary}
        display="flex"
        flexDirection="column"
        sx={{ padding: "16px", width: "30vw", height: "100%" }}
        gap={1}
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
                key={Math.random()}
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
                  .reduce((tot, cur) => (tot += cur))
                  .toFixed(2)} ${Object.values(cartItems)[0].currency}`}
              </Typography>
            )}
          </Box>
          <CardElement />
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
            onClick={() => handleCheckout()}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartPanel;
