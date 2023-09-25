import React, { createContext, useEffect, useState } from "react";
import api from "../appwrite";
import ErrorPopup from "../components/ErrorPopup";
import LoadingOverlay from "../components/LoadingOverlay";

export const AppContext = createContext({
  currentUser: null,
  loading: null,
  error: null,
  startSession: () => {},
  endCurrentSession: () => {},
  setLoading: () => {},
  setError: () => {},
});

const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Run the useEffect on the first render of the app to initialize state based on whether a session already exists. i.e A user is logged in
   */
  useEffect(() => {
    api.getAccount().then((user) => {
      console.log(user);
      setCurrentUser(user);
    });
  }, []);

  const startSession = (user) => {
    setCurrentUser(user);
  };

  const endCurrentSession = () => {
    setCurrentUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        loading,
        error,
        startSession,
        endCurrentSession,
        setLoading,
        setError,
      }}
    >
      {children}
      {error && (
        <ErrorPopup
          message={error}
          reset={() => {
            setError(null);
          }}
        />
      )}
      {loading && <LoadingOverlay loadingMessage={loading} />}
    </AppContext.Provider>
  );
};

export default AppProvider;
