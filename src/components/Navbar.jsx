import {
  AccountCircle,
  AccountCircleOutlined,
  ShoppingBasketOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { dark } from "../themes";
import api from "../appwrite";
import config from "../config";

const Navbar = ({ isCartOpen, handleCartToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser, endCurrentSession, setLoading, setError } =
    useContext(AppContext);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onChangePassword = () => {
    setLoading("");
    api
      .changePassword(currentUser.email)
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
      .catch((err) => setError({ message: err.message, type: "error" }))
      .finally(() => setLoading(null));
  };

  const onLogout = () => {
    setLoading("Logging out");
    api
      .deleteCurrentSession()
      .then(() => {
        endCurrentSession();
      })
      .catch((err) => setError({ message: err.message, type: "error" }))
      .finally(() => setLoading(null));
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: dark.card.background,
      }}
    >
      <Toolbar sx={{ boxShadow: "0 4px 8px rgba(250, 250, 250, 0.3)" }}>
        <Box
          gap={2}
          display="flex"
          justifyContent="left"
          alignItems="center"
          sx={{ flexGrow: 1 }}
        >
          <ShoppingBasketOutlined
            sx={{ fontSize: 36, color: dark.accent.primary }}
          />
          <Typography
            sx={{ fontSize: 24, color: dark.accent.highlight, fontWeight: 500 }}
          >
            {config.appName}
          </Typography>
        </Box>
        <IconButton color="inherit" onClick={handleCartToggle}>
          {isCartOpen ? (
            <ShoppingCart sx={{ color: dark.text.hover, fontSize: 32 }} />
          ) : (
            <ShoppingCartOutlined
              sx={{ color: dark.text.hover, fontSize: 32 }}
            />
          )}
        </IconButton>
        <IconButton color="inherit" onClick={handleMenuOpen}>
          {anchorEl ? (
            <AccountCircle sx={{ color: dark.text.hover, fontSize: 32 }} />
          ) : (
            <AccountCircleOutlined
              sx={{ color: dark.text.hover, fontSize: 32 }}
            />
          )}
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{
            color: dark.text.primary,
          }}
        >
          <MenuItem disabled>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold" }}
                  style={{ color: dark.background }}
                >
                  {currentUser.name}
                </Typography>
              }
              disableTypography
            />
          </MenuItem>
          <MenuItem onClick={onChangePassword}>Change Password</MenuItem>
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
