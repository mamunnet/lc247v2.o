import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Storage keys
const CREDENTIALS_KEY = 'admin_credentials';
const AUTH_STATUS_KEY = 'auth_status';

// Get stored credentials with fallback
const getStoredCredentials = () => {
  try {
    const stored = localStorage.getItem(CREDENTIALS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading stored credentials:', error);
  }
  // Default credentials
  const defaultCredentials = {
    username: 'admin',
    password: 'admin123'
  };
  // Store default credentials if none exist
  localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(defaultCredentials));
  return defaultCredentials;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [credentials, setCredentials] = useState(getStoredCredentials());
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(AUTH_STATUS_KEY) === 'true';
  });

  // Update localStorage whenever credentials change
  useEffect(() => {
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
  }, [credentials]);

  // Update localStorage whenever auth status changes
  useEffect(() => {
    localStorage.setItem(AUTH_STATUS_KEY, isAuthenticated.toString());
  }, [isAuthenticated]);

  const login = (username: string, password: string) => {
    const storedCredentials = getStoredCredentials();
    if (username === storedCredentials.username && password === storedCredentials.password) {
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
    const storedCredentials = getStoredCredentials();
    if (currentPassword === storedCredentials.password) {
      const newCredentials = {
        ...storedCredentials,
        password: newPassword
      };
      setCredentials(newCredentials);
      localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(newCredentials));
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
