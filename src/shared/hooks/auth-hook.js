import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [tokenExpirDate, setTokenExpirDate] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    // useCallback so not rerendered
    setUserId(uid);
    setToken(token);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // token expires in one hour
    setTokenExpirDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setToken(false);
    setTokenExpirDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirDate) {
      // after login not logout
      const remainingTime = tokenExpirDate.getTime() - new Date().getTime(); // get miliseconds
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      // manually logged out
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      // expir date still in future so keep it
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId };
};
