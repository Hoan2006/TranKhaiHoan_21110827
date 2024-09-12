import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setProfile(user);
      } else {
        console.error('No user found');
      }
    });

    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 10000); // 10 giây

    return () => {
      unsubscribe(); // Dọn dẹp listener
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        {profile && (
          <>
            <Image
              style={styles.avatar}
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7F4U3rq1yoMqLUAUZJaFxE5Sv7HZ7hDi8-Q&s' }} // Thay bằng URL ảnh của bạn
            />
            <Text style={styles.name}>{profile.displayName || 'User'}</Text>
            <Text style={styles.email}>{profile.email}</Text>
          </>
        )}
      </View>
      <Text style={styles.infoText}>Bạn sẽ được chuyển qua trang chủ trong 10s!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  profileCard: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    color: '#777',
    marginTop: 16,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
