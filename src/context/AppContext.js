import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext({
  currentUser: null,
  authenticateUser: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

const dummyUser = {
  username: "chinmay",
  displayName: "Chinmay Ghungurde",
};

const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authenticateUser = (logout) => {
    // DUMMY LOGIC: Should be replaced
    if (logout) {
      setCurrentUser(null);
    } else {
      setCurrentUser(dummyUser);
    }
  };

  return (
    <AppContext.Provider
      value={{ currentUser, isLoading, authenticateUser, setIsLoading }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
