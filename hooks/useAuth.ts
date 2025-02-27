import { useState, useEffect, useCallback } from 'react';
import storage from '../utils/storage';
import { router } from 'expo-router';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  avatar?: string;
  personalNumber?: string;
}

// Auth state interface
interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  logoutMessage: string | null;
}

// Storage keys
const USER_STORAGE_KEY = 'auth_user';
const TOKEN_STORAGE_KEY = 'auth_token';

/**
 * Custom hook for authentication state and operations
 */
export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
    logoutMessage: null
  });

  // Load user from storage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await storage.get<User>(USER_STORAGE_KEY);
        const token = await storage.get<string>(TOKEN_STORAGE_KEY);
        
        setState({
          user,
          isLoading: false,
          isAuthenticated: !!user && !!token,
          error: null,
          logoutMessage: null
        });
      } catch (error) {
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: null,
          logoutMessage: null
        });
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null, logoutMessage: null }));
    
    try {
      // For demo purposes, accept any credentials
      // In a real app, you would validate against a backend
      
      // Create mock user
      const mockUser: User = {
        id: '1',
        name: 'Adam Wolf',
        username: email.split('@')[0] || 'adamwolf',
        email: email || 'admin@example.com',
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=250&auto=format&fit=crop',
      };
      const mockToken = 'mock-jwt-token';
      
      // Store user and token
      await storage.set(USER_STORAGE_KEY, mockUser);
      await storage.set(TOKEN_STORAGE_KEY, mockToken);
      
      setState({
        user: mockUser,
        isLoading: false,
        isAuthenticated: true,
        error: null,
        logoutMessage: null
      });
      
      return true;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Login failed. Please try again.',
        logoutMessage: null
      }));
      return false;
    }
  }, []);

  // Signup function
  const signup = useCallback(async (name: string, email: string, password: string, personalNumber?: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null, logoutMessage: null }));
    
    try {
      // Validate password strength (at least 8 characters with letters and numbers)
      if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Şifre en az 8 karakter olmalı ve harf ile rakam içermelidir.',
          logoutMessage: null
        }));
        return false;
      }
      
      // Mock successful signup for demo purposes
      const mockUser: User = {
        id: Date.now().toString(),
        name: name,
        username: email.split('@')[0] || name.toLowerCase().replace(/\s+/g, ''),
        email: email,
        personalNumber: personalNumber,
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=250&auto=format&fit=crop',
      };
      const mockToken = 'mock-jwt-token';
      
      // Store user and token
      await storage.set(USER_STORAGE_KEY, mockUser);
      await storage.set(TOKEN_STORAGE_KEY, mockToken);
      
      setState({
        user: mockUser,
        isLoading: false,
        isAuthenticated: true,
        error: null,
        logoutMessage: null
      });
      
      return true;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to create account',
        logoutMessage: null
      }));
      return false;
    }
  }, []);

  // Update user info
  const updateUserInfo = useCallback(async (updatedUser: User) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Update user in storage
      await storage.set(USER_STORAGE_KEY, updatedUser);
      
      setState(prev => ({
        ...prev,
        user: updatedUser,
        isLoading: false,
      }));
      
      return true;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to update user information',
      }));
      return false;
    }
  }, []);

  // Logout function - completely rewritten with direct navigation
  const logout = useCallback(async () => {
    try {
      // Immediately set authenticated to false to trigger UI updates
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
        logoutMessage: "Çıkış yapıldı"
      });
      
      // Clear all storage in the background
      await Promise.all([
        storage.remove(USER_STORAGE_KEY),
        storage.remove(TOKEN_STORAGE_KEY),
        storage.clear()
      ]);
      
      // Force immediate navigation to login screen
      router.replace('/');
      
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      
      // Even if there's an error, ensure we update the state to logged out
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
        logoutMessage: "Çıkış yapıldı"
      });
      
      // Force navigation to login screen even if logout fails
      router.replace('/');
      
      return true;
    }
  }, []);

  // Clear logout message
  const clearLogoutMessage = useCallback(() => {
    setState(prev => ({
      ...prev,
      logoutMessage: null
    }));
  }, []);

  return {
    user: state.user,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    error: state.error,
    logoutMessage: state.logoutMessage,
    login,
    signup,
    logout,
    updateUserInfo,
    clearLogoutMessage
  };
}