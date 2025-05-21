
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check if user exists in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would make an API call
      // For demo purposes, we'll just simulate a successful login
      if (email && password) {
        // Check if this user is already registered
        const usersJson = localStorage.getItem('users');
        if (usersJson) {
          const users = JSON.parse(usersJson);
          const foundUser = users.find((u: any) => u.email === email);
          
          if (foundUser && foundUser.password === password) {
            const authenticatedUser = {
              id: foundUser.id,
              name: foundUser.name,
              email: foundUser.email
            };
            
            setUser(authenticatedUser);
            localStorage.setItem('user', JSON.stringify(authenticatedUser));
            return true;
          }
        }
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would make an API call
      // For demo purposes, we'll just store the user in localStorage
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password // In a real app, this would be hashed
      };
      
      // Get existing users or initialize empty array
      const usersJson = localStorage.getItem('users');
      const users = usersJson ? JSON.parse(usersJson) : [];
      
      // Check if email already exists
      if (users.some((u: any) => u.email === email)) {
        return false;
      }
      
      // Add new user and save back to localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Log in the user after registration
      const authenticatedUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      };
      
      setUser(authenticatedUser);
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
