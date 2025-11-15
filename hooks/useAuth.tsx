import React, { createContext, useContext, useState, useEffect } from 'react';
import { router } from 'expo-router';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { id: string; email: string } | null;
  login: (userData: { id: string; email: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);

  // In a real app, you'd check for a stored token/session here
  useEffect(() => {
    // Example: check AsyncStorage for a token
    const checkAuthStatus = async () => {
      // const storedToken = await AsyncStorage.getItem('userToken');
      // if (storedToken) {
      //   // Validate token and set user
      //   setIsAuthenticated(true);
      //   setUser({ id: '1', email: 'test@example.com' }); // Placeholder user
      // }
    };
    checkAuthStatus();
  }, []);

  const login = (userData: { id: string; email: string }) => {
    setIsAuthenticated(true);
    setUser(userData);
    // In a real app, you'd store a token here (e.g., AsyncStorage)
    router.replace('/(tabs)'); // Navigate to main app
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // In a real app, you'd remove the stored token here
    router.replace('/(auth)/login'); // Navigate back to login
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
