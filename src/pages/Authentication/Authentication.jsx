import { Box, Container, CssBaseline, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Login from "../../components/Login";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { dark } from "../../themes";
import { ShoppingBasketOutlined } from "@mui/icons-material";
import Register from "../../components/Register";
import config from "../../config";

export const AuthContainer = ({ children }) => {
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
            {config.appName}
          </Typography>
        </Box>
        {children}
      </Paper>
    </Container>
  );
};

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
    <AuthContainer>
      {isLogin ? (
        <Login setRegister={() => setLogin(false)} onAuth={startSession} />
      ) : (
        <Register setLogin={() => setLogin(true)} onAuth={startSession} />
      )}
    </AuthContainer>
  );
};

export default Authentication;
