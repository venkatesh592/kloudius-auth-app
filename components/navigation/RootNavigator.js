import SplashScreen from '@/components/screens/SplashScreen';
import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

export default function RootNavigator() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return <SplashScreen />;

  if (isAuthenticated) return <AppStack />;
  return <AuthStack />

}
