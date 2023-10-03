import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import { dark } from "../themes";
import QuantitySelector from "./QuantitySelector";
import { AppContext } from "../context/AppContext";

const ProductCard = ({
  productId,
  productName,
  description,
  imageUrl,
  price,
  currency,
}) => {
  const { currentUser, startSession } = useContext(AppContext);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (Object.values(currentUser.cartItems).length === 0) {
      setQuantity(0);
    }
  }, [currentUser]);

  const addItemToCart = () => {
    setQuantity((q) => q + 1);
    const newUser = { ...currentUser };
    const newCartItems = { ...newUser.cartItems };
    if (productId in newCartItems) {
      newCartItems[productId].quantity += 1;
      newCartItems[productId].amount += price;
    } else {
      newCartItems[productId] = {
        name: productName,
        quantity: 1,
        amount: price,
        price: price,
        currency: currency,
      };
    }
    newUser.cartItems = { ...newCartItems };
    startSession(newUser);
  };

  const removeItemFromCart = () => {
    setQuantity((q) => q - 1);
    const newUser = { ...currentUser };
    const newCartItems = { ...newUser.cartItems };
    if (productId in newCartItems) {
      if (quantity > 1) {
        newCartItems[productId].quantity -= 1;
        newCartItems[productId].amount -= price;
      } else {
        delete newCartItems[productId];
      }
    }
    newUser.cartItems = { ...newCartItems };
    startSession(newUser);
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: dark.card.backgroundSecondary,
        height: "400px",
        width: "300px",
        minWidth: "250px",
        cursor: "pointer", // Add cursor pointer on hover
        transition: "box-shadow 0.3s", // Add transition effect
        "&:hover": {
          boxShadow: "0 4px 8px rgba(250, 250, 250, 0.3)", // Whitish backdrop shadow on hover
        },
      }}
    >
      <CardMedia
        component="img"
        height="0"
        image={imageUrl}
        title={productName}
        sx={{ height: "50%", objectFit: "cover" }} // Set the image proportion as desired
      />
      <CardContent
        sx={{
          height: "45%",
          overflowY: "scroll",
          "-ms-overflow-style": "none", // Hide scrollbar in IE and Edge
          "scrollbar-width": "none", // Hide scrollbar in Firefox
          "&::-webkit-scrollbar": {
            width: "0.5em", // Adjust scrollbar width as needed
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent", // Hide scrollbar thumb
          },
        }}
      >
        <Typography variant="h6" component="div" color={dark.text.primary}>
          {productName}
        </Typography>
        <Typography variant="body2" color={dark.text.secondary}>
          {description}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
          position: "relative",
          color: dark.text.primary,
          px: 2,
          pt: 2,
          height: "5%",
          paddingBottom: 0,
        }}
      >
        {`${price.toFixed(2)} ${currency}`}
        {quantity === 0 ? (
          <Button
            variant="text"
            sx={{ color: dark.accent.highlight }}
            onClick={() => addItemToCart()}
          >
            Add to Cart
          </Button>
        ) : (
          <QuantitySelector
            quantity={quantity}
            addItemToCart={() => addItemToCart()}
            removeItemFromCart={() => removeItemFromCart()}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
