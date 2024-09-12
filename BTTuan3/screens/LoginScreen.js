import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Đăng nhập với Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Lấy thông tin người dùng và ID token
      const user = userCredential.user;
      const token = await user.getIdToken(); // Lấy ID token từ Firebase

      // Lưu token vào AsyncStorage
      await AsyncStorage.setItem('token', token);

      Alert.alert('Success', 'Logged in successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Profile') },
      ]);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Login Failed', 'Invalid credentials or network error.', [
        { text: 'OK', onPress: () => {} },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
      <Button title="Forgot Password?" onPress={() => navigation.navigate('ForgotPassword')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
