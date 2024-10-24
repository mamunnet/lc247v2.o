import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Default admin credentials - in a real app, this would be in a secure database
const STORAGE_KEY = 'admin_credentials';
const AUTH_STATUS_KEY = 'auth_status';

const getStoredCredentials = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    username: 'admin',
    password: 'admin123'
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [credentials, setCredentials] = useState(getStoredCredentials());
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(AUTH_STATUS_KEY) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(AUTH_STATUS_KEY, isAuthenticated.toString());
  }, [isAuthenticated]);

  const login = (username: string, password: string) => {
    if (username === credentials.username && password === credentials.password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STATUS_KEY);
  };

  const changePassword = (currentPassword: string, newPassword: string) => {
    if (currentPassword === credentials.password) {
      const newCredentials = {
        ...credentials,
        password: newPassword
      };
      setCredentials(newCredentials);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCredentials));
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};