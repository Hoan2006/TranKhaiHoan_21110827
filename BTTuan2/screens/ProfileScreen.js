import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth } from '../src/firebaseConfig';

export default function ProfileScreen({ navigation }) {
  const user = auth.currentUser;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 10000); // 10 giây

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chào mừng, {user.email}!</Text>
      <Text style={styles.text}>Thông tin cá nhân:</Text>
      <Text style={styles.text}>Tên: Trần Khải Hoàn</Text>
      <Text style={styles.text}>MSSV: 21110827</Text>
      <Text style={styles.text}>Bạn sẽ được chuyển qua trang chủ trong 10s!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    margin: 10,
  },
});
