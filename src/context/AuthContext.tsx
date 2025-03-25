
import React, { createContext, useState, useContext, useEffect } from 'react';

type UserRole = 'admin' | 'user';

interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for saved user in localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('giftoria-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === 'admin';

  // Mock login function (in a real app, this would validate against a backend)
  const login = (email: string, role: UserRole = 'user') => {
    // Create a mock user (in a real app, this would come from your backend)
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      email,
      role,
      name: email.split('@')[0]
    };
    
    // Save user to state and localStorage
    setUser(newUser);
    localStorage.setItem('giftoria-user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('giftoria-user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
