import React, { useContext, useEffect, useState } from "react";
import { AuthContainer } from "./Authentication";
import { Typography } from "@mui/material";
import { dark } from "../../themes";
import api from "../../appwrite";
import { AppContext } from "../../context/AppContext";

const VerifyEmail = () => {
  const { setLoading } = useContext(AppContext);
  const [text, setText] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uId = urlParams.get("userId");
    const s = urlParams.get("secret");

    handleVerifyEmail(uId, s);
  }, []);

  const handleVerifyEmail = (userId, secret) => {
    setLoading("");
    api
      .confirmVerification(userId, secret)
      .then(() => {
        setText("Email is verified. You can close this window.");
      })
      .catch((err) => {
        setText(err.message);
      })
      .finally(() => setLoading(null));
  };

  return (
    <AuthContainer>
      <Typography sx={{ fontSize: 20, color: dark.text.primary }}>
        {!!text && text}
      </Typography>
    </AuthContainer>
  );
};

export default VerifyEmail;
