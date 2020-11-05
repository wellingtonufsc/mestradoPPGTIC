import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [userName, setUserName] = useState(false);
  const [userType, setUserType] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, name, type, expirationDate) => {
    setUserName(name);
    setUserId(uid);
    setUserType(type);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        userName: name,
        userType: type,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUserName(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setUserType(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (userName && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [userName, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.userName &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.userName, storedData.userType, new Date(storedData.expiration));
    }
  }, [login]);

  return { userName, login, logout, userId, userType };
};