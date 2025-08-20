import { fakeSignIn, fakeSignOut, fakeSignUp } from '@/services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

export const AuthContext = createContext(null);

const AUTH_KEY = 'AUTH_TOKEN';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);         // {id, email}
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);   // controls Splash

  // boot: restore session
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(AUTH_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          setUser(parsed.user);
          setToken(parsed.token);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const { token: t, user: u } = await fakeSignIn(email, password);
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify({ token: t, user: u }));
    setUser(u);
    setToken(t);
  }, []);

  const signUp = useCallback(async ({ name, email, password }) => {
    const { token: t, user: u } = await fakeSignUp(name, email, password);
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify({ token: t, user: u }));
    setUser(u);
    setToken(t);
  }, []);

  const signOut = useCallback(async () => {
    await fakeSignOut();
    await AsyncStorage.removeItem(AUTH_KEY);
    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo(() => ({
    user, token, loading, signIn, signUp, signOut, isAuthenticated: !!token
  }), [user, token, loading, signIn, signUp, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
