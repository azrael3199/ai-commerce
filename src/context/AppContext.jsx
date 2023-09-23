import React, { createContext, useEffect, useState } from "react";
import api from "../appwrite";

export const AppContext = createContext({
  currentUser: null,
  startSession: () => {},
  endCurrentSession: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Run the useEffect on the first render of the app to initialize state based on whether a session already exists. i.e A user is logged in
   */
  useEffect(() => {
    api.getAccount().then((user) => {
      console.log(user)
      setCurrentUser(user)
    })
  }, [])

  const startSession = (user) => {
    setCurrentUser(user);
  };

  const endCurrentSession = () => {
    setCurrentUser(null)
  }

  return (
    <AppContext.Provider
      value={{ currentUser, isLoading, startSession, endCurrentSession, setIsLoading }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
