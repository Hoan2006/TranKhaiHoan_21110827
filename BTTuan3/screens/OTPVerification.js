import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function OTPVerification({ route, navigation }) {
  const { otp: sentOtp, email } = route.params;
  const [enteredOtp, setEnteredOtp] = useState('');

  const handleVerifyOtp = () => {
    if (enteredOtp === sentOtp) {
      Alert.alert('Success', 'OTP verified successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Home') }, 
      ]);
    } else {
      Alert.alert('Failed', 'Invalid OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter OTP"
        value={enteredOtp}
        onChangeText={setEnteredOtp}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="Verify OTP" onPress={handleVerifyOtp} />
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
