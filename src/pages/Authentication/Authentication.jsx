import { Box, Container, CssBaseline, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Login from "../../components/Login";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { dark } from "../../themes";
import { ShoppingBasketOutlined } from "@mui/icons-material";
import Register from "../../components/Register";

const Authentication = () => {
  const navigate = useNavigate();
  const { currentUser, startSession } = useContext(AppContext);

  const [isLogin, setLogin] = useState(true);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <Container
      component="main"
      maxWidth="100vw"
      maxHeight="100vh"
      sx={{
        display: "flex",
        backgroundColor: dark.background,
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          minWidth: "30vw",
          background: dark.card.background,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box gap={2} display="flex" justifyContent="center" alignItems="center">
          <ShoppingBasketOutlined
            sx={{ fontSize: 36, color: dark.accent.primary }}
          />
          <Typography sx={{ fontSize: 36, color: dark.accent.highlight }}>
            AI-Commerce
          </Typography>
        </Box>
        {isLogin ? (
          <Login setRegister={() => setLogin(false)} onAuth={startSession} />
        ) : (
          <Register setLogin={() => setLogin(true)} onAuth={startSession} />
        )}
      </Paper>
    </Container>
  );
};

export default Authentication;
