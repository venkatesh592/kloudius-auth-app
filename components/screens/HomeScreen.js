import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi {user?.name || user?.email} 👋</Text>
      <Text style={styles.subtitle}>You’re logged in.</Text>

      <TouchableOpacity style={styles.btnOutline} onPress={signOut}>
        <Text style={styles.btnOutlineText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 20 },
  btnOutline: { borderWidth: 1, borderColor: '#111827', padding: 12, borderRadius: 10 },
  btnOutlineText: { color: '#111827', fontWeight: '700' },
});
