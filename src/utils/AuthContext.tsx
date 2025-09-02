import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * User interface definition
 */
interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'student';
  libraryId?: string;
  phone?: string;
  registrationNumber?: string;
}

/**
 * Authentication context interface
 */
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<boolean>;
  signup: (userData: any) => Promise<boolean>;
  verifyOTP: (otp: string) => Promise<boolean>;
  logout: () => void;
  pendingUser: any;
  setPendingUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication Provider Component
 * Manages user authentication state and methods throughout the application
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load user from localStorage if available
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('user');
  });
  const [pendingUser, setPendingUser] = useState<any>(null);

  /**
   * Mock login function - simulates backend authentication
   */
  const login = async (email: string): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Try to get registered user from localStorage (from signup/OTP)
      const registeredUserStr = localStorage.getItem('user');
      let registeredUser: User | null = registeredUserStr ? JSON.parse(registeredUserStr) : null;

      // If found and email matches, use that user
      if (registeredUser && registeredUser.email === email) {
        setUser(registeredUser);
        setIsAuthenticated(true);
        return true;
      }

      // Otherwise, fallback to mock logic (use email prefix as name)
      const nameFromEmail = email.split('@')[0];
      const mockUser: User = {
        id: '1',
        name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
        email,
        role: 'student',
        libraryId: 'lib-001',
        phone: '+1234567890',
        registrationNumber: 'REG-2024-001'
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  /**
   * Mock signup function - prepares user data for OTP verification
   */
  const signup = async (userData: any): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store pending user data for OTP verification
      setPendingUser(userData);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  /**
   * Mock OTP verification - default OTP is 0000
   */
  const verifyOTP = async (otp: string): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Default OTP is 0000
      if (otp === '0000' && pendingUser) {
        const newUser: User = {
          id: Date.now().toString(),
          name: pendingUser.name,
          email: pendingUser.email,
          role: pendingUser.role,
          libraryId: pendingUser.role === 'student' ? 'lib-001' : undefined,
          phone: pendingUser.phone,
          registrationNumber: pendingUser.registrationNumber
        };
        
  setUser(newUser);
  setIsAuthenticated(true);
  setPendingUser(null);
  localStorage.setItem('user', JSON.stringify(newUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('OTP verification error:', error);
      return false;
    }
  };

  /**
   * Logout function - clears user state
   */
  const logout = () => {
  setUser(null);
  setIsAuthenticated(false);
  setPendingUser(null);
  localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated,
    login,
    signup,
    verifyOTP,
    logout,
    pendingUser,
    setPendingUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use authentication context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};