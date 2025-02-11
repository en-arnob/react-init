/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Base API URL from environment variables
const api = {
  base: import.meta.env.VITE_API_BASE_URL,
};

// Create the DataContext
const DataContext = createContext();

// Custom hook to use DataContext
export const useData = () => useContext(DataContext);

// DataProvider component
// eslint-disable-next-line react/prop-types
export const DataProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // Login method
  const methodSignin = async (signinData) => {
    try {
      const res = await axios.post(`${api.base}/v1/login/`, signinData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res?.status === 200) {
        setCurrentUser(res.data);
        // console.log(res.data);
        // localStorage.setItem("loggedinUser", res.data);
      }
      return res;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const methodSignout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  return (
    <DataContext.Provider
      value={{
        currentUser,
        methodSignin,
        methodSignout,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
