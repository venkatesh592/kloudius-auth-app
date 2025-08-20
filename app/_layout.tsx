import RootNavigator from '@/components/navigation/RootNavigator';
import { AuthProvider } from '@/context/AuthContext';
import React from 'react';
import 'react-native-reanimated';

export default function RootLayout() {

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

