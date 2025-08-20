import TextField from '@/components/common/TextField';
import { AuthContext } from '@/context/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email required'),
  password: yup.string().min(6, 'Min 6 chars').required('Password required'),
});

export default function LoginScreen({ navigation }) {
  const { signIn } = useContext(AuthContext);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (values) => {
    try {
      await signIn(values);
    } catch (err) {
      const msg = err?.message || 'Unable to login. Please try again.';
      if (/invalid/i.test(msg)) {
        Alert.alert('Login failed', 'Invalid email/password format.');
      } else {
        Alert.alert('Login failed', msg);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in to Kloudius</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextField
            label="Email"
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            keyboardType="email-address"
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextField
            label="Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            error={errors.password?.message}
          />
        )}
      />

      <TouchableOpacity style={styles.btn} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.btnText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.linkBtn}>
        <Text>New here? <Text style={styles.link}>Create an account</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 24, textAlign: 'center' },
  btn: { backgroundColor: '#111827', padding: 14, borderRadius: 10, marginTop: 6 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
  linkBtn: { marginTop: 16, alignItems: 'center' },
  link: { color: '#2563eb', fontWeight: '600' },
});
