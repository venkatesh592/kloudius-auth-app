import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TextField({ label, error, secureTextEntry, ...props }) {
  const [hidden, setHidden] = useState(secureTextEntry);

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputWrapper, error && styles.inputWrapperError]}>
        <TextInput
          style={styles.input}
          secureTextEntry={hidden}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setHidden(!hidden)}>
            <Ionicons
              name={hidden ? 'eye-off' : 'eye'}
              size={20}
              color="#666"
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 14 },
  label: { marginBottom: 6, fontWeight: '600' },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  inputWrapperError: { borderColor: 'crimson' },
  input: { flex: 1, padding: 12 },
  error: { marginTop: 6, color: 'crimson' },
  icon: { marginLeft: 8 },
});
