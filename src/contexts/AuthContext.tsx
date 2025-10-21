import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Admin } from '@/lib/supabase';

interface AuthContextType {
  admin: Admin | null;
  login: (admin: Admin) => void;
  logout: () => void;
  isLoading: boolean;
  sessionExpired: boolean;
  clearSessionExpired: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    const loginTime = localStorage.getItem('adminLoginTime');
    
    if (storedAdmin && loginTime) {
      const currentTime = Date.now();
      const sessionDuration = currentTime - parseInt(loginTime);
      const fifteenMinutes = 15 * 60 * 1000; // 15 minutes in milliseconds
      
      if (sessionDuration < fifteenMinutes) {
        setAdmin(JSON.parse(storedAdmin));
      } else {
        // Session expired
        localStorage.removeItem('admin');
        localStorage.removeItem('adminLoginTime');
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (admin) {
      const timeout = setTimeout(() => {
        setAdmin(null);
        localStorage.removeItem('admin');
        localStorage.removeItem('adminLoginTime');
        setSessionExpired(true);
      }, 15 * 60 * 1000); // 15 minutes

      return () => clearTimeout(timeout);
    }
  }, [admin]);

  const login = (adminData: Admin) => {
    setAdmin(adminData);
    localStorage.setItem('admin', JSON.stringify(adminData));
    localStorage.setItem('adminLoginTime', Date.now().toString());
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
    localStorage.removeItem('adminLoginTime');
  };

  const clearSessionExpired = () => {
    setSessionExpired(false);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, isLoading, sessionExpired, clearSessionExpired }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};