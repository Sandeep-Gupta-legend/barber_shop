import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('barber_admin_token'));
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem('barber_admin_user') || 'null')
  );

  const login = (userData, accessToken) => {
    setToken(accessToken);
    setAdmin(userData);
    localStorage.setItem('barber_admin_token', accessToken);
    localStorage.setItem('barber_admin_user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('barber_admin_token');
    localStorage.removeItem('barber_admin_user');
  };

  const value = useMemo(
    () => ({
      token,
      admin,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, admin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
