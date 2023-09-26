import { Box, Typography } from "@mui/material";
import React from "react";
import { dark } from "../themes";

const ProductCapsule = ({
  quantity,
  productName,
  productPrice,
  totalAmount,
  currency,
}) => {
  return (
    <Box
      display="flex"
      p={2}
      maxWidth="100%"
      minWidth="80%"
      width="100%"
      sx={{ backgroundColor: dark.card.background, borderRadius: "8px", p: 0 }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minWidth="7%"
        maxWidth="7%"
        width="7%"
        sx={{
          backgroundColor: dark.accent.highlight,
          m: 0,
          p: "6px 8px",
          borderRadius: "8px",
        }}
      >
        <Typography variant="subtitle2" fontSize={14}>
          QTY.
        </Typography>
        <Typography
          display="flex"
          flex={1}
          justifyContent="center"
          alignItems="center"
          fontSize={16}
          fontWeight="bold"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          py="4px"
        >
          {quantity}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        flex={1}
        alignItems="center"
        minWidth="43%"
        maxWidth="43%"
        width="43%"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        sx={{
          m: 0,
          p: "6px 8px",
        }}
      >
        <Typography
          width="100%"
          textAlign="center"
          variant="subtitle2"
          fontSize={14}
          color={dark.text.secondary}
        >
          Product Name
        </Typography>
        <Typography
          fontSize={16}
          fontWeight={500}
          textAlign="center"
          py="4px"
          color={dark.text.primary}
        >
          {productName}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="25%"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        sx={{
          m: 0,
          p: "6px 8px",
        }}
      >
        <Typography
          variant="subtitle2"
          fontSize={14}
          color={dark.text.secondary}
        >
          Price per item
        </Typography>
        <Typography
          fontSize={16}
          fontWeight={500}
          py="4px"
          color={dark.text.primary}
        >
          {`${productPrice.toFixed(2)} ${currency}`}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="25%"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        sx={{
          m: 0,
          p: "6px 8px",
        }}
      >
        <Typography
          variant="subtitle2"
          fontSize={14}
          color={dark.text.secondary}
        >
          Total
        </Typography>
        <Typography
          fontSize={16}
          fontWeight={500}
          py="4px"
          color={dark.text.primary}
        >
          {`${totalAmount.toFixed(2)} ${currency}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductCapsule;
