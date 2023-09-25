import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import api from "../../appwrite";

const Home = () => {
  const { currentUser, endCurrentSession } = useContext(AppContext);

  const handleLogout = () => {
    api.deleteCurrentSession().then(() => {
      endCurrentSession()
    }).catch((err) => {
      console.error("Error in logging out", err)
    })
  }

  return (
    <div className="home">
      Welcome {currentUser.name}
      <button
        onClick={() => {
          handleLogout()
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
