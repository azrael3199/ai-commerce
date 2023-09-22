import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { currentUser, authenticateUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [currentUser]);

  return (
    <div className="home">
      Welcome {currentUser.displayName}
      <button
        onClick={() => {
          authenticateUser(true);
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
