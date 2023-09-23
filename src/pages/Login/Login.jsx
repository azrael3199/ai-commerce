import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import api from "../../appwrite";

const Login = () => {
  const { currentUser, startSession } = useContext(AppContext);

  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const handleLogin = async (email="example@gmail.com", password="bullsh!doAlert2343@") => {
    api.createSession(email, password).then(async () => {
      try {
        const user = await api.getAccount()
        startSession(user)
      } catch (err) {
        throw err
      }
    }).catch((err) => {
      // Log to a service
      console.error(err)
    })
  }

  return (
    <div className="login-container">
      Login
      <button
        onClick={() => {
          handleLogin()
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
