import { createContext, useContext, useEffect, useState } from "react";

//Context
export const AuthContext = createContext();


//Provider
export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };
    let isLoggedIn = !!token;
    console.log("logged: ", isLoggedIn)

    

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem('token');
    }

    const getTokenFromLS = () => {
      return localStorage.getItem('token');S
    }
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, token, storeTokenInLS, LogoutUser, getTokenFromLS }}>
      {children}
    </AuthContext.Provider>
  );
};


//Delivery
export const useAuth = () => {
    const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return ctx;

}