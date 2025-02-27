import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import ErrorBoundary from '../components/ErrorBoundary';
import { BackHandler } from 'react-native';
import { useAuth } from '../hooks/useAuth';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export default function RootLayout() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.frameworkReady) {
      window.frameworkReady();
    }
  }, []);

  // Handle hardware back button on Android (prevent going back after logout)
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // If on login screen and not authenticated, prevent going back
      if (!isAuthenticated) {
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [isAuthenticated]);

  return (
    <ErrorBoundary>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ animation: 'none' }} />
        <Stack.Screen name="signup" />
        <Stack.Screen name="(tabs)" options={{ animation: 'none' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ErrorBoundary>
  );
}