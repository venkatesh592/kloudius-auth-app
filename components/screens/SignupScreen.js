import TextField from '@/components/common/TextField';
import { AuthContext } from '@/context/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().min(2, 'Enter full name').required('Name required'),
  email: yup.string().email('Invalid email').required('Email required'),
  password: yup.string().min(6, 'Min 6 chars').required('Password required'),
  confirm: yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required('Confirm password'),
});

export default function SignupScreen() {
  const { signUp } = useContext(AuthContext);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: '', email: '', password: '', confirm: '' }
  });

  const onSubmit = async (values) => {
    try {
      await signUp(values);
    } catch (err) {
      const msg = err?.message || 'Unable to sign up. Please try again.';
      if (/already.*(registered|in use)/i.test(msg)) {
        Alert.alert('Signup failed', 'Email is already in use.');
      } else {
        Alert.alert('Signup failed', msg);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your account</Text>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextField
            label="Name"
            value={value}
            onChangeText={onChange}
            error={errors.name?.message}
          />
        )}
      />

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

      <Controller
        control={control}
        name="confirm"
        render={({ field: { onChange, value } }) => (
          <TextField
            label="Confirm Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            error={errors.confirm?.message}
          />
        )}
      />

      <TouchableOpacity style={styles.btn} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.btnText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 24, textAlign: 'center' },
  btn: { backgroundColor: '#111827', padding: 14, borderRadius: 10, marginTop: 6 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
});
