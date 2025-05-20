import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Define the token payload type
interface TokenPayload {
  sub: string;
  exp: number;
  username: string;
  email: string;
}

// Define the user type
interface User {
  id: string;
  username: string;
  email: string;
}

// Define the auth context type
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the auth provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const navigate = useNavigate();

  // Configure axios with the base URL
  const API_URL = 'http://localhost:8080/api';
  
  axios.defaults.baseURL = API_URL;

  // Set the axios interceptor for adding the token to requests
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      config => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [token]);

  // Check if the token is valid on initial load
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp < currentTime) {
          // Token has expired
          logout();
        } else {
          // Token is valid
          setUser({
            id: decoded.sub,
            username: decoded.username,
            email: decoded.email
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Invalid token
        logout();
      }
    }
  }, [token]);

  // Login function
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/auth/login', { username, password });
      const { token, username: userName, email } = response.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      
      // Decode the token to get the user ID
      const decoded = jwtDecode<TokenPayload>(token);
      
      setUser({
        id: decoded.sub,
        username: userName,
        email
      });
      
      setIsAuthenticated(true);
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/auth/register', { username, email, password });
      const { token, username: userName, email: userEmail } = response.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      
      // Decode the token to get the user ID
      const decoded = jwtDecode<TokenPayload>(token);
      
      setUser({
        id: decoded.sub,
        username: userName,
        email: userEmail
      });
      
      setIsAuthenticated(true);
      navigate('/');
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated,
        isLoading,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};