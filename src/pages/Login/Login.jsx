import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { currentUser, authenticateUser } = useContext(AppContext);
  const navigate = useNavigate();

  console.log("On login");

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <div className="login-container">
      Login
      <button
        onClick={() => {
          authenticateUser();
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
